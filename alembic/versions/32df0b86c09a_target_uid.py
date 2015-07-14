"""target_uid

Revision ID: 32df0b86c09a
Revises: 125dd1a9bab5
Create Date: 2015-07-14 12:44:15.990112

"""

# revision identifiers, used by Alembic.
revision = '32df0b86c09a'
down_revision = '125dd1a9bab5'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('campaign_target', sa.Column('uid', sa.String(length=100), nullable=True))
    op.create_index('ix_campaign_target_uid', 'campaign_target', ['uid'], unique=False)
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_campaign_target_uid', table_name='campaign_target')
    op.drop_column('campaign_target', 'uid')
    ### end Alembic commands ###