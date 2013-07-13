# -*- coding: utf-8 -*-

import os

from flask.ext.script import Manager, Server

from fbone import create_app
from fbone.extensions import db
from fbone.user import User, UserDetail, ADMIN, ACTIVE
from fbone.utils import MALE


app = create_app()
manager = Manager(app)

port = int(os.environ.get("PORT", 5000))
manager.add_command("runserver", Server(host="0.0.0.0", port=port))

@manager.command
def run():
    """Run in local machine."""

    app.run()


@manager.command
def initdb():
    """Init/reset database."""

    db.drop_all()
    db.create_all()

    calum = User(
            name=u'calum',
            email=u'calum@calumjeadie.com',
            password=u'password',
            role_code=ADMIN,
            status_code=ACTIVE,
            user_detail=UserDetail(
                sex_code=MALE,
                age=10,
                url=u'http://www.calumjeadie.com',
                deposit=100.00,
                location=u'UK',
                bio=u''))

    db.session.add(calum)
    db.session.commit()


manager.add_option('-c', '--config',
                   dest="config",
                   required=False,
                   help="config file")

if __name__ == "__main__":
    manager.run()
