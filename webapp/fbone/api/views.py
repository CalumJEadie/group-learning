# -*- coding: utf-8 -*-

from flask import Blueprint, current_app, request, jsonify
from flask.ext.login import login_user, current_user, logout_user

from ..extensions import db

from ..user import User
from ..models import TaskProgressUpdate


api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated():
        return jsonify(flag='success')

    username = request.form.get('username')
    password = request.form.get('password')
    if username and password:
        user, authenticated = User.authenticate(username, password)
        if user and authenticated:
            if login_user(user, remember='y'):
                return jsonify(flag='success')

    current_app.logger.debug('login(api) failed, username: %s.' % username)
    return jsonify(flag='fail', msg='Sorry, try again.')


@api.route('/logout')
def logout():
    if current_user.is_authenticated():
        logout_user()
    return jsonify(flag='success', msg='Logouted.')

@api.route('/task_progress_update/<task_label>/<progress_level>')
def task_progress_update(task_label, progress_level):
    """
    :param task_label: 
    :param progress_level: whether a task has been completed or not
    """
    task_progress_update = TaskProgressUpdate(task_label, progress_level)
    db.session.add(task_progress_update)
    db.session.commit()
    return jsonify(flag='success')
