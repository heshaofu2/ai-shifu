"""add lesson is updated to attend

Revision ID: 7b292904ed2f
Revises: 2528660f9dd4
Create Date: 2024-12-04 09:20:38.146268

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7b292904ed2f"
down_revision = "2528660f9dd4"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("ai_course_lesson_attend", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "lesson_updated",
                sa.Integer(),
                nullable=False,
                comment="Lesson is  updated",
            )
        )
        batch_op.add_column(
            sa.Column(
                "lesson_unique_id",
                sa.String(length=36),
                nullable=False,
                comment="Lesson unique ID",
            )
        )
        batch_op.create_index(
            batch_op.f("ix_ai_course_lesson_attend_lesson_unique_id"),
            ["lesson_unique_id"],
            unique=False,
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("ai_course_lesson_attend", schema=None) as batch_op:
        batch_op.drop_index(batch_op.f("ix_ai_course_lesson_attend_lesson_unique_id"))
        batch_op.drop_column("lesson_unique_id")
        batch_op.drop_column("lesson_updated")

    # ### end Alembic commands ###
