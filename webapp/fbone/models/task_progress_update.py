# -*- coding: utf-8 -*-

from sqlalchemy import Column, types

from ..extensions import db
from ..utils import get_current_time, STRING_LEN

class TaskProgressUpdate(db.Model):

    __tablename__ = 'task_progress_updates'

    id = Column(db.Integer, primary_key=True)
    task_label = Column(db.String(STRING_LEN), nullable=False)
    progress_level = Column(db.Boolean, nullable=False)
    recieved_time = Column(db.DateTime, default=get_current_time)

    def __init__(self, task_label, progress_level):
        self.task_label = task_label
        self.progress_level = progress_level