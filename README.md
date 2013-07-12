Group Learning
==============

Entrepreneur First Education Hackathon 12/07/2013


Requirements
------------

https://github.com/imwilsonxu/fbone#usage

virtualenvwrapper


Setup
-----

```sh
mkproject group-learning
git clone ...
cd webapp
python setup.py install
```

Usage
-----

```sh
workon group-learning
cd webapp
fab reset
python manage.py runserver
```

API
---

### Creating a task progress update

```
api/task_progress_update/<task_id>/<progress_level>
```

```
<task_id> : string
<progress_level> : boolean (0/1)
```

### Reading task progress

```
api/cummulative_task_progress_all
```

```json
{
  "flag": "success", 
  "progress": [
    {
      "completed_count": 5, 
      "not_completed_count": 2, 
      "task_label": "functions_with_irb_1"
    }
  ]
}
```
