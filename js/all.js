
        var list = document.querySelector('.display-section ');
        var sendData = document.querySelector('.add-btn');
        var dataBase = JSON.parse(localStorage.getItem('listItem')) || [];

        sendData.addEventListener('click', addData);
        list.addEventListener('click', delData, false);
        list.addEventListener('click', modData, false);
        list.addEventListener('click', inputBlur, false);
        updateList(dataBase);
        document.querySelector('#title').focus();
        document.getElementById('description').addEventListener('keydown', function (e) {
            if (e.keyCode == '13') {
                addData(e)
            }
        }, false);

        document.getElementById('title').addEventListener('keydown', function (e) {
            if (e.keyCode == '13') {
                addData(e)
            }
        }, false);

        function addData(e) {
            if (document.getElementById('title').value.replace(/^\s+|\s+$/g, "") != '') {
                e.preventDefault();
                var title = document.querySelector('#title').value;
                var description = document.querySelector('#description').value;
                var todo = {
                    title: title,
                    description: description
                };
                dataBase.push(todo);
                updateList(dataBase);
                localStorage.setItem('listItem', JSON.stringify(dataBase));
                document.querySelector('#title').value = '';
                document.querySelector('#title').focus();
                document.querySelector('#description').value = '';
            } else {
                alert('Please fill in the title field')
                document.querySelector('#title').focus();
            }
        }

        function updateList(dataBase) {
            str = '';
            var len = dataBase.length;
            for (var i = 0; len > i; i++) {
                str += `<li data-li='${i}' class="d-flex justify-content-between my-1 py-2 px-3">
                    <div class="d-flex flex-column justify-content-center" style="width:80%">
                        <h3 class="">${dataBase[i].title}</h2>
                        <input class="content" data-input='${i}' type="text" value="${dataBase[i].description}" disabled>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center" style="width:15%">
                        <a href="#" data-num='${i}' role="button" id="modify-btn" class="modify-btn btn btn-warning d-block bg-gradient my-1 text-decoration-none text-center">Modify</a>
                        <a href="#" data-num='${i}' role="button" id="delete-btn" class="delete-btn btn btn-danger d-block bg-gradient my-1 text-decoration-none text-center">Delete</a>
                    </div>
                </li>`;
            }
            list.innerHTML = str;
            var x = window.matchMedia("(max-width: 575px)")
            mediaAdjust(x)
            x.addListener(mediaAdjust)
        }

        function delData(e) {
            e.preventDefault();
            if (e.target.id !== 'delete-btn') { return; };
            var num = e.target.dataset.num;
            dataBase.splice(num, 1);
            localStorage.setItem('listItem', JSON.stringify(dataBase));
            updateList(dataBase);
        }
        function modData(e) {
            e.preventDefault();
            if (e.target.id !== 'modify-btn') { return; };
            var num = e.target.dataset.num;
            console.log(num + 'modify-btn');
            if (document.querySelector(`input[data-input="${num}"]`).disabled == false) {
                document.querySelector(`input[data-input="${num}"]`).disabled = true
            } else {
                document.querySelector(`input[data-input="${num}"]`).disabled = false;
                document.querySelector(`input[data-input="${num}"]`).focus()
            }

        }

        function inputBlur(e) {
            e.preventDefault();
            inputArray = document.querySelectorAll('.content');
            for (let i = 0; i < inputArray.length; i++) {
                inputArray[i].addEventListener('blur', function () {
                    this.disabled = true;
                    dataBase[i].description = this.value
                    localStorage.setItem('listItem', JSON.stringify(dataBase));
                    updateList(dataBase);
                })
                inputArray[i].addEventListener('keydown', function (e) {
                    if (e.keyCode == '13') {
                        document.getElementById('title').focus()
                    }
                })
            }
        }

        function mediaAdjust(x) {
            if (x.matches) {
                document.getElementById('add-btn').innerHTML = "C"
                let modArray = document.querySelectorAll('.modify-btn')
                for (let i = 0; i < modArray.length; i++) {
                    modArray[i].innerHTML = 'M'
                }
                let delArray = document.querySelectorAll('.delete-btn')
                for (let i = 0; i < modArray.length; i++) {
                    delArray[i].innerHTML = 'D'
                }
            } else {
                document.getElementById('add-btn').innerHTML = "Create"
                let modArray = document.querySelectorAll('.modify-btn')
                for (let i = 0; i < modArray.length; i++) {
                    modArray[i].innerHTML = 'Modify'
                }
                let delArray = document.querySelectorAll('.delete-btn')
                for (let i = 0; i < modArray.length; i++) {
                    delArray[i].innerHTML = 'Delete'
                }
            }
        }

        var x = window.matchMedia("(max-width: 575px)")
        mediaAdjust(x)
        x.addListener(mediaAdjust)