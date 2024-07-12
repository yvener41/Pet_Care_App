"""empty message

Revision ID: a337de165509
Revises: 8fb0c92f74c3
Create Date: 2024-07-12 00:43:46.587811

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a337de165509'
down_revision = '8fb0c92f74c3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dog_table', schema=None) as batch_op:
        batch_op.alter_column('gender',
               existing_type=sa.BOOLEAN(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dog_table', schema=None) as batch_op:
        batch_op.alter_column('gender',
               existing_type=sa.String(),
               type_=sa.BOOLEAN(),
               existing_nullable=True)

    # ### end Alembic commands ###
