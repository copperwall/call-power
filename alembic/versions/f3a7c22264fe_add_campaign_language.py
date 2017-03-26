"""add campaign language

Revision ID: f3a7c22264fe
Revises: 76b8da7e112d
Create Date: 2017-03-10 14:17:26.322225

"""

# revision identifiers, used by Alembic.
revision = 'f3a7c22264fe'
down_revision = '76b8da7e112d'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('campaign_campaign', schema=None) as batch_op:
        batch_op.add_column(sa.Column('campaign_language', sa.String(length=100), nullable=True, server_default='en'))

    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('campaign_campaign', schema=None) as batch_op:
        batch_op.drop_column('campaign_language')

    ### end Alembic commands ###