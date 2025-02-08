import asyncio
import json
import logging

import ray
from hurrican_memory_config import memory_config_societyagent_hurrican

from agentsociety import AgentSimulation
from agentsociety.cityagent import SocietyAgent
from agentsociety.cityagent.metrics import mobility_metric
from agentsociety.configs import ExpConfig, SimConfig, WorkflowStep
from agentsociety.utils import LLMRequestType, WorkflowType

logging.getLogger("agentsociety").setLevel(logging.INFO)

ray.init(logging_level=logging.WARNING, log_to_driver=False)


async def update_weather_and_temperature(simulation: AgentSimulation):
    if not hasattr(update_weather_and_temperature, "trigger_time"):
        update_weather_and_temperature.trigger_time = 0
    if update_weather_and_temperature.trigger_time == 0:
        await simulation.update_environment(
            "weather",
            "Hurricane Dorian has made landfall in other cities, travel is slightly affected, and winds can be felt",
        )
        update_weather_and_temperature.trigger_time = 1
    if update_weather_and_temperature.trigger_time == 1:
        await simulation.update_environment(
            "weather", "The weather is normal and does not affect travel"
        )


async def gather_work_home(simulation: AgentSimulation):
    print("gather plan & work & home")
    citizen_uuids = await simulation.filter(types=[SocietyAgent])
    plans = await simulation.gather("plan_history", citizen_uuids)
    homes = await simulation.gather("home", citizen_uuids)
    works = await simulation.gather("work", citizen_uuids)
    with open(f"./plans.json", "w", encoding="utf-8") as f:
        json.dump(plans, f, ensure_ascii=False, indent=2)

    with open(f"./homes.json", "w", encoding="utf-8") as f:
        json.dump(homes, f, ensure_ascii=False, indent=2)

    with open(f"./works.json", "w", encoding="utf-8") as f:
        json.dump(works, f, ensure_ascii=False, indent=2)


sim_config = (
    SimConfig()
    .SetLLMRequest(
        request_type=LLMRequestType.ZhipuAI, api_key="YOUR-API-KEY", model="GLM-4-Flash"
    )
    .SetSimulatorRequest(min_step_time=100)
    .SetMQTT(server="mqtt.example.com", username="user", port=1883, password="pass")
    # change to your file path
    .SetMapRequest(file_path="map.pb")
    # .SetAvro(path='./__avro', enabled=True)
    .SetPostgreSql(path="postgresql://user:pass@localhost:5432/db", enabled=True)
)
exp_config = (
    ExpConfig(exp_name="hurrican", llm_semaphore=200, logging_level=logging.INFO)
    .SetAgentConfig(
        number_of_citizen=1000,
        number_of_firm=50,
        group_size=50,
        memory_config_func={SocietyAgent: memory_config_societyagent_hurrican},
    )
    .SetWorkFlow(
        [
            WorkflowStep(type=WorkflowType.RUN, days=3),
            WorkflowStep(
                type=WorkflowType.INTERVENE, func=update_weather_and_temperature
            ),
            WorkflowStep(type=WorkflowType.RUN, days=3),
            WorkflowStep(
                type=WorkflowType.INTERVENE, func=update_weather_and_temperature
            ),
            WorkflowStep(type=WorkflowType.RUN, days=3),
        ]
    )
    .SetMetricExtractors(metric_extractors=[(1, mobility_metric)])
)


async def main():
    await AgentSimulation.run_from_config(exp_config, sim_config)
    ray.shutdown()


if __name__ == "__main__":
    asyncio.run(main())
