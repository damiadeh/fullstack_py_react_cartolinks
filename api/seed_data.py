
users_data = [ {"email": "test@mail.com", "password": "pass1234"} ]

directories_data = [
        {"name": "first", 'parent_id': None},
        {"name": "second", 'parent_id': None},
        {"name": "first_step", "parent_id":1},
        {"name": "second_step", "parent_id": 2},
        {"name": "second_step2", "parent_id": 2}
    ]

files_data = [
        {"name": "root.png","size": 9023, "directory_id": None},
        {"name": "root_secong.pdf","size": 10023, "directory_id": 1},
        {"name": "document.docx","size": 23456, "directory_id": 1},
        {"name": "profile.png","size": 30000, "directory_id": 2},
        {"name": "second.pdf","size": 2300948, "directory_id": 2},
    ]