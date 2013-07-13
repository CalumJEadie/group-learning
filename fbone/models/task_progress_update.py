# -*- coding: utf-8 -*-

from sqlalchemy import Column, types, func

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

    @classmethod
    def get_cummulative_progress_all(cls):
        
        # completed_counts = db.session.query(TaskProgressUpdate.task_label, func.count(TaskProgressUpdate.id)) \
        #     .group_by(TaskProgressUpdate.task_label) \
        #     .filter(TaskProgressUpdate.progress_level==True)\
        #     .all()

        # not_completed_counts = db.session.query(TaskProgressUpdate.task_label, func.count(TaskProgressUpdate.id)) \
        #     .group_by(TaskProgressUpdate.task_label) \
        #     .filter(TaskProgressUpdate.progress_level==False)\
        #     .all()

        # print completed_counts

        # progress = []
        # for completed_count, not_completed_count in zip(completed_counts, not_completed_counts):
        #     # Something about this feels really nasty, adding as assert, mostly
        #     # out of guilt.
        #     assert completed_counts[0] == not_completed_counts[0]
        #     progress.append({
        #         "task_label": completed_count[0],
        #         "completed_count": completed_count[1],
        #         "not_completed_count": not_completed_count[1]
        #     })
        # return progress
        
        task_labels = cls.get_task_labels()

        progress = []
        for task_label in task_labels:
            progress.append({
                "task_label": task_label,
                "completed_count": cls.get_completed_count(task_label),
                "not_completed_count": cls.get_not_completed_count(task_label)
            })

        return progress

    @classmethod
    def get_task_labels(cls):
        return [x[0] for x in db.session.query(TaskProgressUpdate.task_label).distinct().all()]

    @classmethod
    def get_completed_count(cls, task_label):
        return cls.query.filter(TaskProgressUpdate.task_label==task_label, \
            TaskProgressUpdate.progress_level==True).count()

    @classmethod
    def get_not_completed_count(cls, task_label):
        return cls.query.filter(TaskProgressUpdate.task_label==task_label, \
            TaskProgressUpdate.progress_level==False).count()
