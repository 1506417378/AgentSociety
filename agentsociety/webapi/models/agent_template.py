import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional, Union
from enum import Enum

from pydantic import AwareDatetime, BaseModel, Field
from sqlalchemy import JSON
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from ._base import Base, TABLE_PREFIX

__all__ = ["AgentTemplateDB", "TemplateBlock", "ApiAgentTemplate"]


class DistributionType(str, Enum):
    CHOICE = "choice"
    UNIFORM_INT = "uniform_int"
    NORMAL = "normal"


class ChoiceDistribution(BaseModel):
    type: DistributionType = DistributionType.CHOICE
    params: Dict[str, Union[List[str], List[float]]] = Field(
        ..., description="Choice distribution parameters including choices and weights"
    )


class UniformIntDistribution(BaseModel):
    type: DistributionType = DistributionType.UNIFORM_INT
    params: Dict[str, int] = Field(
        ...,
        description="Uniform distribution parameters including min_value and max_value",
    )


class NormalDistribution(BaseModel):
    type: DistributionType = DistributionType.NORMAL
    params: Dict[str, float] = Field(
        ..., description="Normal distribution parameters including mean and std"
    )


class ChoiceDistributionConfig(BaseModel):
    type: DistributionType = DistributionType.CHOICE
    choices: List[str]
    weights: List[float]


class UniformIntDistributionConfig(BaseModel):
    type: DistributionType = DistributionType.UNIFORM_INT
    min_value: int
    max_value: int


class NormalDistributionConfig(BaseModel):
    type: DistributionType = DistributionType.NORMAL
    mean: float
    std: float


Distribution = Union[ChoiceDistribution, UniformIntDistribution, NormalDistribution]
DistributionConfig = Union[
    ChoiceDistributionConfig, UniformIntDistributionConfig, NormalDistributionConfig
]


class AgentTemplateDB(Base):
    """Agent template database model"""

    __tablename__ = f"{TABLE_PREFIX}agent_template"

    tenant_id: Mapped[str] = mapped_column(primary_key=True)
    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[Optional[str]] = mapped_column()
    agent_type: Mapped[str] = mapped_column()
    agent_class: Mapped[str] = mapped_column()
    profile: Mapped[Dict] = mapped_column(type_=JSONB)
    base: Mapped[Dict] = mapped_column(
        type_=JSONB,
        default=lambda: {
            "home": {"aoi_position": {"aoi_id": 0}},
            "work": {"aoi_position": {"aoi_id": 0}},
        },
    )
    states: Mapped[Dict] = mapped_column(
        type_=JSONB, default=lambda: {"needs": "str", "plan": "dict"}
    )
    agent_params: Mapped[Dict] = mapped_column(type_=JSONB)
    blocks: Mapped[Dict] = mapped_column(type_=JSONB)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.now, onupdate=datetime.now
    )


class AgentParams(BaseModel):
    """Agent parameters model with dynamic fields"""

    class Config:
        extra = "allow"  # 允许额外的字段
        arbitrary_types_allowed = True  # 允许任意类型

    def __init__(self, **data):
        super().__init__(**data)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "AgentParams":
        """从字典创建 AgentParams 实例"""
        return cls(**data)

    def to_dict(self) -> Dict[str, Any]:
        """将 AgentParams 实例转换为字典"""
        return self.model_dump()


class TemplateBlock(BaseModel):
    """Template block model"""

    id: str
    name: str
    type: str
    description: str
    dependencies: Dict[str, str] = Field(default_factory=dict)
    params: Dict[str, Any] = Field(default_factory=dict)


class BaseConfig(BaseModel):
    """Base configuration model"""

    home: Dict[str, Any] = Field(
        default_factory=lambda: {"aoi_position": {"aoi_id": 0}}
    )
    work: Dict[str, Any] = Field(
        default_factory=lambda: {"aoi_position": {"aoi_id": 0}}
    )


class StatesConfig(BaseModel):
    """States configuration model"""

    needs: str = "str"
    plan: str = "dict"
    selfDefine: Optional[str] = None


class ApiAgentTemplate(BaseModel):
    """Agent template model for API"""

    tenant_id: Optional[str] = None
    id: Optional[str] = None
    name: str = Field(..., description="Template name")
    description: Optional[str] = Field(None, description="Template description")
    agent_type: str = Field(..., description="Agent type (citizen or supervisor)")
    agent_class: str = Field(..., description="Agent class name")
    memory_distributions: Dict[str, Union[Distribution, DistributionConfig]] = Field(
        ..., description="Memory distributions configuration"
    )
    base: Dict[str, Dict[str, Any]] = Field(
        default_factory=lambda: {
            "home": {"aoi_position": {"aoi_id": 0}},
            "work": {"aoi_position": {"aoi_id": 0}},
        },
        description="Base location configuration",
    )
    states: Dict[str, str] = Field(
        default_factory=lambda: {"needs": "str", "plan": "dict"},
        description="Agent states configuration",
    )
    agent_params: AgentParams = Field(default_factory=AgentParams)
    blocks: Dict[str, Dict[str, Any]] = Field(
        default_factory=dict, description="Block configurations with block type as key"
    )
    created_at: Optional[AwareDatetime] = None
    updated_at: Optional[AwareDatetime] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "name": "Example Template",
                "description": "A template example",
                "memory_distributions": {
                    "name": {
                        "dist_type": "choice",
                        "choices": ["张三", "李四", "王五"],
                        "weights": [0.3, 0.3, 0.4],
                    },
                    "age": {
                        "dist_type": "uniform_int",
                        "min_value": 18,
                        "max_value": 60,
                    },
                },
                "agent_params": {
                    "enable_cognition": True,
                    "UBI": 1000,
                    "num_labor_hours": 8,
                    "productivity_per_labor": 1.0,
                    "time_diff": 1.0,
                    "max_plan_steps": 5,
                },
                "blocks": {
                    "mobilityblock": {"search_limit": 50, "radius_prompt": "xxx"}
                },
            }
        }
