(() => {
  const addContactBtn = document.getElementById('add__user-form-contacts-addbtn');
  const cancel = document.getElementById('add__user-cancel-btn');
  const userClose = document.querySelector('.add__user-close');
  const form = document.getElementById('add__user-form-contacts-wrapper');
  const table = document.getElementById('table__body');
  const sortByIdBtn = document.getElementById('table__header-id-btn');
  const sortByNameBtn = document.getElementById('table__header-fio-btn');
  const sortByDateCreateBtn = document.getElementById('table__header-date-btn');
  const sortByDateChangeBtn = document.getElementById('table__header-changes-btn');
  const searchInput = document.getElementById('header__search');
  const id = document.getElementById('id-block');
  const wrapper = document.querySelector('.wrapper')

  const sectionAdd = document.getElementById('add__client-section');
  const sectionRemove = document.getElementById('remove__client-section')
  const inputSecondName = document.getElementById('add__user-form-secondname');
  const inputName = document.getElementById('add__user-form-name');
  const inputPatronymic = document.getElementById('add__user-form-patronymic');

  let time;
  let usersList = [];

  const addUserBtn = document.getElementById('add__user-save-btn');
  const addUserChangeBtn = document.getElementById('add__user-save-change-btn');

  let formContact;
  let contacts = [];

  const SVG_SIZE = "12"
  const xmlns = "http://www.w3.org/2000/svg";

  function createContact(item = []) {

    let countContact = document.querySelectorAll('.contact__item');
    addContactBtn.style.display = 'block';
    if (countContact.length === 0) {
      formContact = document.createElement('ul');
      formContact.classList.add('contact__input-block');
      form.prepend(formContact);
    }

    const svg = document.createElementNS(xmlns, "svg");
    const path = document.createElementNS(xmlns, "path");
    svg.setAttributeNS(null, "viewBox", "0 0 " + SVG_SIZE + " " + SVG_SIZE);
    svg.setAttributeNS(null, "width", SVG_SIZE);
    svg.setAttributeNS(null, "height", SVG_SIZE);
    svg.setAttributeNS(null, "fill", "none");
    path.setAttributeNS(null, "d", "M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z")
    path.setAttributeNS(null, 'fill', "#B0B0B0")
    svg.append(path);

    const contact = document.createElement('li')
    const inputData = document.createElement('input')
    const select = document.createElement('select')
    const cancelContact = document.createElement('button')
    const optionTel = document.createElement('option')
    const optionDopTer = document.createElement('option')
    const optionEmail = document.createElement('option')
    const optionVK = document.createElement('option')
    const optionFb = document.createElement('option')
    const optionDef = document.createElement('option')


    cancelContact.classList.add('delete__contact', 'btn-reset');
    cancelContact.append(svg);
    contact.classList.add('contact__item');
    inputData.classList.add('typecontact__input', 'input__reset');
    inputData.setAttribute('placeholder', 'Введите данные контакта');
    select.classList.add('add__user-form-typecontact')
    select.id = 'add__user-form-typecontact';
    optionTel.classList.add('typecontact__item');
    optionTel.textContent = 'Телефон';
    optionTel.value = 'Tel'

    optionDopTer.classList.add('typecontact__item');
    optionDopTer.textContent = 'Доп. телефон';
    optionDopTer.value = 'AddTel';

    optionEmail.classList.add('typecontact__item');
    optionEmail.textContent = 'Email';
    optionEmail.value = 'Email';

    optionVK.classList.add('typecontact__item');
    optionVK.textContent = 'Vk';
    optionVK.value = 'Vk';

    optionFb.classList.add('typecontact__item');
    optionFb.textContent = 'Facebook';
    optionFb.value = 'Fb';


    optionDef.classList.add('typecontact__item');
    optionDef.textContent = 'Дополнительно';
    optionDef.value = 'Defoult';


    cancelContact.addEventListener('click', () => {
      addContactBtn.style.display = 'block';
      contact.remove();
      const countContact = document.querySelectorAll('.contact__item');
      if (countContact.length === 0) {
        formContact.remove();
      }
    })


    select.append(optionTel);
    select.append(optionDopTer);
    select.append(optionEmail);
    select.append(optionVK);
    select.append(optionFb);
    select.append(optionDef);
    contact.append(select);
    contact.append(inputData);
    contact.append(cancelContact);
    formContact.append(contact);

    if(Object.keys(item).length === 2){
      select.value = item.type;
      inputData.value = item.value;
    }

    new Choices(select, {
      searchEnabled: false,
      itemSelectText: "",
    })

    countContact = document.querySelectorAll('.contact__item');
    if (countContact.length === 10) {
      addContactBtn.style.display = 'none';
    }
  }

  function cancelForm() {
    addContactBtn.style.display = 'block';
    if (formContact) {
      formContact.remove();
    }
    inputSecondName.value = '';
    inputName.value = '';
    inputPatronymic.value = '';

    inputSecondName.nextElementSibling.classList.remove('input__focus')
    inputName.nextElementSibling.classList.remove('input__focus')
    inputPatronymic.nextElementSibling.classList.remove('input__focus')
    document.querySelector('.error-desc').style.display = 'none'
    document.querySelector('.wrapper').classList.remove('wrapper-active');
  }

  const inputPlaceholder = function (input) {
    return function () {
      input.style.borderBottom = '1px solid #B0B0B0'
      if (input.value === '') {
        input.nextElementSibling.classList.remove('input__focus')
      } else {
        input.nextElementSibling.classList.add('input__focus')
      }
    }
  }

  function printErrorPreliminary(){
    let errorMsg = '';
    if(!inputName.value){
      errorMsg += 'Заполните имя пользователя </br>'
      inputName.style.borderBottom = '1px solid red'
    }
    if(!inputSecondName.value){
      errorMsg += 'Заполните фамилию пользователя'
      inputSecondName.style.borderBottom = '1px solid red'
    }

    if(errorMsg){
      document.querySelector('.error-desc').style.display = 'block'
      document.querySelector('.error-desc').innerHTML = errorMsg;
      return true;
    }
  }

  async function addUserChange(){
    if (printErrorPreliminary()) return;
    addUserChangeBtn.parentElement.classList.add('save-change-client');
    addUserChangeBtn.classList.add('save-change-client-btn');
    const selectType = document.querySelectorAll('.add__user-form-typecontact');
    const selectValue = document.querySelectorAll('.typecontact__input');
    let idCLient = document.getElementById('id-block');
    for (let i = 0; i < selectType.length; i++) {
      const item = {
        type: selectType[i].value,
        value: selectValue[i].value
      }
      contacts.push(item);
    }

    try{
      let response = await fetch(`http://localhost:3000/api/clients/${idCLient.textContent.replace('ID: ','')}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: inputName.value.trim(),
          surname: inputSecondName.value.trim(),
          lastName: inputPatronymic.value.trim(),
          contacts: contacts
        })
      });
      contacts = [];
      const data = await response.json()
      if(response.ok) {
        cancelForm()
        clearTable();
        document.querySelector('.load').style.display = "block"
        await loadListUsers()
        document.querySelector('.error-desc').style.display = 'none'
      }
      else {
        printError(data);
      }
    }
    catch{
      document.querySelector('.error-desc').style.display = 'block'
      document.querySelector('.error-desc').innerHTML = 'Что-то пошло не так...'
    }
    addUserChangeBtn.parentElement.classList.remove('save-change-client');
    addUserChangeBtn.classList.remove('save-change-client-btn');
  }

  async function addUser() {
    if (printErrorPreliminary()) return;

    addUserBtn.parentElement.classList.add('save-change-client');
    addUserBtn.classList.add('save-change-client-btn');

    const selectType = document.querySelectorAll('.add__user-form-typecontact');
    const selectValue = document.querySelectorAll('.typecontact__input');

    for (let i = 0; i < selectType.length; i++) {
      const item = {
        type: selectType[i].value,
        value: selectValue[i].value
      }
      contacts.push(item);
    }

    try {
      let response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: inputName.value.trim(),
          surname: inputSecondName.value.trim(),
          lastName: inputPatronymic.value.trim(),
          contacts: contacts
        })
      });
      contacts = [];
      const data = await response.json()
      if(response.ok) {
        cancelForm()
        clearTable();
        document.querySelector('.load').style.display = "block"
        clearTimeout(time);
        time = setTimeout(loadListUsers, 500)
        document.querySelector('.error-desc').style.display = 'none'
      } else {
        printError(data);
      }
    } catch (error) {
      document.querySelector('.error-desc').style.display = 'block'
      document.querySelector('.error-desc').innerHTML = 'Что-то пошло не так...'
    }
    finally {
      addUserBtn.parentElement.classList.remove('save-change-client');
      addUserBtn.classList.remove('save-change-client-btn');
    }
  }

  function printError(data) {
    document.querySelector('.error-desc').style.display = 'block'
    document.querySelector('.error-desc').innerHTML = '';
    data.errors.forEach( item => document.querySelector('.error-desc').innerHTML += item.message + '<br/>')
  }

  async function loadListUsers() {
    try {
      const response = await fetch('http://localhost:3000/api/clients');
      usersList = await response.json();
      document.querySelector('.load').style.display = "none"
      listUsers = [...usersList];
      sortById();
    } catch (error) {
      document.querySelector('.load').style.display = "none"
      document.querySelector('.add__client').setAttribute('disabled','disabled')
      document.querySelector('.add__client').textContent = 'Что-то пошло не так...'
      document.querySelector('.add__client').classList.add('not-load');

      sortByIdBtn.setAttribute('disabled','disabled')
      sortByNameBtn.setAttribute('disabled','disabled')
      sortByDateCreateBtn.setAttribute('disabled','disabled')
      sortByDateChangeBtn.setAttribute('disabled','disabled')
    }
  }

  function drawArrowSort() {
    const svg = document.createElementNS(xmlns, "svg");
    const path = document.createElementNS(xmlns, "path");
    // const g = document.createElementNS(xmlns, "g");
    svg.setAttributeNS(null, "viewBox", "0 0 8 8");
    svg.setAttributeNS(null, "width", "8");
    svg.setAttributeNS(null, "height", "8");
    svg.setAttributeNS(null, "fill", "none");
    path.setAttributeNS(null, "d", "M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z")
    path.setAttributeNS(null, 'fill', "#9873FF")
    // g.setAttributeNS(null, 'opacity', '0.7')
    // g.append(path);
    svg.style.marginLeft = '4px'
    svg.append(path);

    const svgId = svg.cloneNode(true)
    const svgName = svg.cloneNode(true)
    const svgCreate = svg.cloneNode(true)
    const svgChange = svg.cloneNode(true)

    sortByIdBtn.append(svgId)
    sortByNameBtn.append(svgName)
    sortByDateCreateBtn.append(svgCreate)
    sortByDateChangeBtn.append(svgChange)
  }

  const changeClient = function (changeBtn,client, svg, svgLoad){
    return async function () {
      document.querySelectorAll('.change__btn').forEach(item => item.setAttribute('disabled', 'true'))
      document.querySelectorAll('.cancel__btn').forEach(item => item.setAttribute('disabled', 'true'))

      inputName.style.borderBottom = '1px solid #B0B0B0'
      inputSecondName.style.borderBottom = '1px solid #B0B0B0'
      svg.style.display = 'none';
      svgLoad.style.display = 'block';
      const response = await fetch(`http://localhost:3000/api/clients/${client.id}`);
      const data = await response.json()

      addUserChangeBtn.style.display = 'block';
      addUserBtn.style.display = 'none';
      cancel.style.display = 'none';
      document.querySelector('.remove-block').remove();
      const div = document.createElement('div');
      div.classList.add('remove-block', 'wrapper-cancel');
      const DeleteBtn = document.createElement('button');
      DeleteBtn.classList.add('remove__client-btn', 'btn-reset','btn-form');
      DeleteBtn.textContent = 'Удалить клиента';
      DeleteBtn.addEventListener('click', ()=>{
        fetch(`http://localhost:3000/api/clients/${client.id}`, {
          method: 'DELETE'
        });
        // this.outerHTML = this.outerHTML;
        clearTable();
        document.querySelector('.wrapper').classList.toggle('wrapper-active');
        document.querySelector('.load').style.display = "block"
        clearTimeout(time);
        time = setTimeout(loadListUsers, 500)
      })
      div.append(DeleteBtn)
      document.querySelector('.add__user').append(div)
      document.querySelector('.wrapper').classList.toggle('wrapper-active');
      document.querySelector('.add__user-title').textContent = 'Изменить данные'
      sectionRemove.classList.add('display-none')
      sectionAdd.classList.remove('display-none')
      id.style.display = 'inline-block';

      inputSecondName.nextElementSibling.classList.add('input__focus')
      inputName.nextElementSibling.classList.add('input__focus')
      inputPatronymic.nextElementSibling.classList.add('input__focus')

      id.textContent = `ID: ${client.id}`
      inputSecondName.value = data.surname;
      inputName.value = data.name
      inputPatronymic.value = data.lastName

      data.contacts.forEach(item =>{
        createContact(item)
      })
      svg.style.display = 'block';
      svgLoad.style.display = 'none';
      document.querySelectorAll('.change__btn').forEach(item => item.removeAttribute('disabled'))
      document.querySelectorAll('.cancel__btn').forEach(item => item.removeAttribute('disabled'))
    }
  }

  const alertRemoveClient = function (id) {
    return function () {
      cancel.style.display = 'inline';
      document.querySelector('.remove-block').style.display = 'none';
      document.querySelector('.remove__client').remove();
      const div = document.createElement('div');
      const button = document.createElement('button');
      div.classList.add('remove__client', 'block-btn');
      button.classList.add('remove__client-btn', 'form-btn', 'btn-reset');
      button.id = 'remove__client-btn'
      button.textContent = 'Удалить'

      button.addEventListener('click',() => {
        fetch(`http://localhost:3000/api/clients/${id}`, {
          method: 'DELETE'
        });

        // this.outerHTML = this.outerHTML;
        clearTable();
        document.querySelector('.wrapper').classList.toggle('wrapper-active');
        document.querySelector('.load').style.display = "block"
        clearTimeout(time);
        time = setTimeout(loadListUsers, 500)
      })

      div.append(button)
      sectionRemove.append(div)
      sectionRemove.classList.remove('display-none')
      sectionAdd.classList.add('display-none');
      document.querySelector('.wrapper').classList.toggle('wrapper-active');
    }
  }

  function creatTable(usersList) {
    clearTable()
    for (const item of usersList) {
      const tr = document.createElement('tr');
      const tdId = document.createElement('td');
      const tdFio = document.createElement('td');
      const tdDateCreate = document.createElement('td');
      const tdDateChang = document.createElement('td');
      const tdContacts = document.createElement('td');
      const divDateCreateBlock = document.createElement('div')
      const divDateChangeBlock = document.createElement('div')
      const tdMove = document.createElement('td');
      const changeBtn = document.createElement('button');
      const DeleteBtn = document.createElement('button');
      const ul = document.createElement('ul');


      divDateCreateBlock.classList.add('data__block')
      divDateChangeBlock.classList.add('data__block')
      ul.classList.add('list__contacts');
      tdId.classList.add('table__body-id');
      tdFio.classList.add('table__body-fio');
      tdDateCreate.classList.add('table__body-datecreate');
      tdDateChang.classList.add('table__body-datechange');
      tdContacts.classList.add('table__body-contacts');
      tdMove.classList.add('table__body-move');


      for (const contact of item.contacts) {
        const li = document.createElement('li');
        li.classList.add('list__contacts-item');

        const button = document.createElement('button');
        button.classList.add('contacts__link', 'btn-reset');
        button.id = contact.type;

        const svg = document.createElementNS(xmlns, "svg");
        const path = document.createElementNS(xmlns, "path");
        const g = document.createElementNS(xmlns, "g");
        const circle = document.createElementNS(xmlns, 'circle')

        switch (contact.type) {
          case 'Tel':
            svg.setAttributeNS(null, "viewBox", "0 0 16 16");
            svg.setAttributeNS(null, "width", "16");
            svg.setAttributeNS(null, "height", "16");
            svg.setAttributeNS(null, "fill", "none");
            circle.setAttributeNS(null, "cx", "8")
            circle.setAttributeNS(null, "cy", "8")
            circle.setAttributeNS(null, "r", "8")
            circle.setAttributeNS(null, "fill", "#9873FF")
            circle.classList.add('pth-hover')
            path.setAttributeNS(null, "d", "M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z")
            path.setAttributeNS(null, 'fill', "white")
            g.setAttributeNS(null, 'opacity', '0.7')
            g.append(circle);
            g.append(path);
            svg.append(g);
            tippy(button, {
              content: 'Телефон: ' + contact.value,
              allowHTML: false,
              allowHTML: true,
            });
            break;
          case 'AddTel':
            svg.setAttributeNS(null, "viewBox", "0 0 16 16");
            svg.setAttributeNS(null, "width", "16");
            svg.setAttributeNS(null, "height", "16");
            svg.setAttributeNS(null, "fill", "none");
            circle.setAttributeNS(null, "cx", "8")
            circle.setAttributeNS(null, "cy", "8")
            circle.setAttributeNS(null, "r", "8")
            circle.setAttributeNS(null, "fill", "#9873FF")
            circle.classList.add('pth-hover')
            path.setAttributeNS(null, "d", "M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z")
            path.setAttributeNS(null, 'fill', "white")
            g.setAttributeNS(null, 'opacity', '0.7')
            g.append(circle);
            g.append(path);
            svg.append(g);
            tippy(button, {
              content: 'Доп. телефон: ' + contact.value,
              allowHTML: false,
              allowHTML: true,
            });
            break;
          case 'Email':
            svg.setAttributeNS(null, "viewBox", "0 0 16 16");
            svg.setAttributeNS(null, "width", "16");
            svg.setAttributeNS(null, "height", "16");
            svg.setAttributeNS(null, "fill", "none");
            path.setAttributeNS(null, "d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z")
            path.setAttributeNS(null, 'fill', "#9873FF")
            path.setAttributeNS(null, 'opacity', "0.7")
            path.setAttributeNS(null, 'fill-rule', "evenodd")
            path.setAttributeNS(null, 'clip-rule', "evenodd")
            path.classList.add('pth-hover');
            svg.append(path);
            tippy(button, {
              content: 'Email: ' + contact.value,
              allowHTML: false,
              allowHTML: true,
            });
            break;
          case 'Vk':
            svg.setAttributeNS(null, "viewBox", "0 0 16 16");
            svg.setAttributeNS(null, "width", "16");
            svg.setAttributeNS(null, "height", "16");
            svg.setAttributeNS(null, "fill", "none");
            path.setAttributeNS(null, "d", "M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z")
            path.setAttributeNS(null, 'fill', "#9873FF")
            path.classList.add('pth-hover');
            g.setAttributeNS(null, 'opacity', '0.7')
            g.append(path);
            svg.append(g);

            tippy(button, {
              content: 'Vk: ' + contact.value,
              allowHTML: false,
              allowHTML: true,
            });
            break;
          case 'Fb':
            svg.setAttributeNS(null, "viewBox", "0 0 16 16");
            svg.setAttributeNS(null, "width", "16");
            svg.setAttributeNS(null, "height", "16");
            svg.setAttributeNS(null, "fill", "none");
            path.setAttributeNS(null, "d", "M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z")
            path.setAttributeNS(null, 'fill', "#9873FF")
            path.classList.add('pth-hover');
            g.setAttributeNS(null, 'opacity', '0.7')
            g.append(path);
            svg.append(g);
            tippy(button, {
              content: 'Facebook: ' + contact.value,
              allowHTML: false,
              allowHTML: true,
            });
            break;
          default:
            svg.setAttributeNS(null, "viewBox", "0 0 16 16");
            svg.setAttributeNS(null, "width", "16");
            svg.setAttributeNS(null, "height", "16");
            svg.setAttributeNS(null, "fill", "none");
            path.setAttributeNS(null, "d", "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z")
            path.setAttributeNS(null, 'fill', "#9873FF")
            path.setAttributeNS(null, 'opacity', "0.7")
            path.setAttributeNS(null, 'fill-rule', "evenodd")
            path.setAttributeNS(null, 'clip-rule', "evenodd")
            path.classList.add('pth-hover');
            svg.append(path);

            tippy(button, {
              content: contact.value,
              allowHTML: false,
              allowHTML: true,
            });
        }
        button.append(svg)
        li.append(button)
        ul.append(li);
      }

      changeBtn.classList.add('change__btn', 'btn-reset');
      DeleteBtn.classList.add('cancel__btn', 'btn-reset');

      const svgLoad = document.createElementNS(xmlns, "svg");
      const pathLoad = document.createElementNS(xmlns, "path");

      svgLoad.setAttributeNS(null, "viewBox", "0 0 16 16");
      svgLoad.setAttributeNS(null, "width", "16");
      svgLoad.setAttributeNS(null, "height", "16");
      svgLoad.setAttributeNS(null, "fill", "none");
      pathLoad.setAttributeNS(null, "d", "M3.00008 8.03996C3.00008 10.8234 5.2566 13.08 8.04008 13.08C10.8236 13.08 13.0801 10.8234 13.0801 8.03996C13.0801 5.25648 10.8236 2.99996 8.04008 2.99996C7.38922 2.99996 6.7672 3.1233 6.196 3.348")
      pathLoad.setAttributeNS(null, "stroke", "#9873FF")
      pathLoad.setAttributeNS(null, "stroke-width", "2")
      pathLoad.setAttributeNS(null, "stroke-miterlimit", "10")
      pathLoad.setAttributeNS(null, "stroke-linecap", "round")
      svgLoad.append(pathLoad);

      svgLoad.classList.add('load__svg');
      svgLoad.style.display = 'none';

      const svgChange = document.createElementNS(xmlns, "svg");
      const path = document.createElementNS(xmlns, "path");
      const g = document.createElementNS(xmlns, "g");
      svgChange.setAttributeNS(null, "viewBox", "0 0 16 16");
      svgChange.setAttributeNS(null, "width", "16");
      svgChange.setAttributeNS(null, "height", "16");
      svgChange.setAttributeNS(null, "fill", "none");
      path.setAttributeNS(null, "d", "M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z")
      path.setAttributeNS(null, 'fill', "#9873FF")
      g.setAttributeNS(null, 'opacity', '0.7')
      g.append(path);
      svgChange.append(g);
      changeBtn.append(svgChange)
      changeBtn.prepend(svgLoad);

      const btnSpanChange = document.createElement('span');
      const btnSpanDelete = document.createElement('span');


      const svgDelete = document.createElementNS(xmlns, "svg");
      const pathDelete = document.createElementNS(xmlns, "path");
      const gDelete = document.createElementNS(xmlns, "g");
      svgDelete.setAttributeNS(null, "viewBox", "0 0 16 16");
      svgDelete.setAttributeNS(null, "width", "16");
      svgDelete.setAttributeNS(null, "height", "16");
      svgDelete.setAttributeNS(null, "fill", "none");
      pathDelete.setAttributeNS(null, "d", "M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z")
      pathDelete.setAttributeNS(null, 'fill', "#F06A4D")
      gDelete.setAttributeNS(null, 'opacity', '0.7')
      gDelete.append(pathDelete);
      svgDelete.append(gDelete);

      DeleteBtn.append(svgDelete)


      btnSpanChange.innerText = "Изменить";
      btnSpanDelete.innerText = "Удалить";

      changeBtn.append(btnSpanChange)
      DeleteBtn.append(btnSpanDelete)

      const spanCreateDate = document.createElement('span');
      const spanChangeDate = document.createElement('span');
      spanCreateDate.classList.add('span__date', 'span__date-create');
      spanChangeDate.classList.add('span__date', 'span__date-change');

      const spanCreateTime = document.createElement('span');
      const spanChangeTime = document.createElement('span');

      spanCreateTime.classList.add('span__time', 'span__create');
      spanChangeTime.classList.add('span__time', 'span__change');

      let date = new Date(item.createdAt);
      spanCreateDate.innerText = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
      spanCreateTime.innerText = ('0' + date.getHours()).slice(-2) + ':' + ('0' + (date.getMinutes() + 1)).slice(-2);

      date = new Date(item.updatedAt);

      spanChangeDate.innerText = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
      spanChangeTime.innerText = ('0' + date.getHours()).slice(-2) + ':' + ('0' + (date.getMinutes() + 1)).slice(-2);


      changeBtn.addEventListener('click', changeClient(changeBtn,item,svgChange,svgLoad))
      DeleteBtn.addEventListener('click', alertRemoveClient(item.id))

      tdId.innerText = item.id;
      tdFio.innerText = item.surname + ' ' + item.name + ' ' + item.lastName;
      tdContacts.append(ul);
      tdMove.append(changeBtn, DeleteBtn)

      divDateChangeBlock.append(spanChangeDate,spanChangeTime)
      divDateCreateBlock.append(spanCreateDate,spanCreateTime)
      tdDateCreate.append(divDateCreateBlock)
      tdDateChang.append(divDateChangeBlock)
      tr.append(tdId, tdFio, tdDateCreate, tdDateChang, tdContacts, tdMove);
      table.append(tr);
    }
    searchInput.removeAttribute('disabled')
  }

  const allDisActive = document.querySelectorAll('.th-btn')

  function allDisActiveDraw() {
    for (const item of allDisActive) {
      item.classList.remove('is-active')
    }
  }

  let listUsers = []
  let flagSortId = true;

  function sortById() {
    if (flagSortId) {
      listUsers.sort((a, b) => a.id - b.id)
      flagSortId = false
      sortByIdBtn.lastChild.style.transform = "rotateZ(0deg)"
    } else {
      listUsers.sort((a, b) => b.id - a.id)
      flagSortId = true
      sortByIdBtn.lastChild.style.transform = "rotateZ(-180deg)"
    }
    allDisActiveDraw()
    sortByIdBtn.classList.add('is-active');
    creatTable(listUsers);
  }

  let flagSortName = true;

  function sortByName() {
    if (flagSortName) {
      listUsers.sort((a, b) =>
        (a.secondName + ' ' + a.name + ' ' + a.lastName > b.secondName + ' ' + b.name + ' ' + b.lastName) ?
          1 : (b.secondName + ' ' + b.name + ' ' + b.lastName > a.secondName + ' ' + a.name + ' ' + a.lastName) ?
            -1 : 0);
      flagSortName = false;
      sortByNameBtn.lastChild.style.transform = "rotateZ(0deg)"
    } else {
      listUsers.sort((a, b) =>
        (a.secondName + ' ' + a.name + ' ' + a.lastName < b.secondName + ' ' + b.name + ' ' + b.lastName) ?
          1 : (b.secondName + ' ' + b.name + ' ' + b.lastName < a.secondName + ' ' + a.name + ' ' + a.lastName) ?
            -1 : 0);
      flagSortName = true;
      sortByNameBtn.lastChild.style.transform = "rotateZ(-180deg)"
    }
    allDisActiveDraw()
    sortByNameBtn.classList.add('is-active');
    creatTable(listUsers);
  }

  let flagSortDateCreate = true;

  function sortByDateCreate() {
    if (flagSortDateCreate) {
      listUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      flagSortDateCreate = false
      sortByDateCreateBtn.lastChild.style.transform = "rotateZ(0deg)"
    } else {
      listUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      flagSortDateCreate = true
      sortByDateCreateBtn.lastChild.style.transform = "rotateZ(-180deg)"
    }
    allDisActiveDraw()
    sortByDateCreateBtn.classList.add('is-active');
    creatTable(listUsers);
  }

  let flagSortDateChange = true;

  function sortByDateChange() {
    if (flagSortDateChange) {
      listUsers.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
      flagSortDateChange = false
      sortByDateChangeBtn.lastChild.style.transform = "rotateZ(0deg)"
    } else {
      listUsers.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      flagSortDateChange = true
      sortByDateChangeBtn.lastChild.style.transform = "rotateZ(-180deg)"
    }
    allDisActiveDraw()
    sortByDateChangeBtn.classList.add('is-active');
    creatTable(listUsers);
  }

  function clearTable() {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }

  let timeSearch;
  function searchCLient() {
    clearTimeout(timeSearch)
    timeSearch = setTimeout(async ()=>{
      clearTable();
      document.querySelector('.load').style.display = "block"
      const response = await fetch(`http://localhost:3000/api/clients?search=${searchInput.value}`);
      listUsers = await response.json()
      creatTable(listUsers);
      document.querySelector('.load').style.display = "none"
    },300)
  }


  function addClientOpenForm() {
    inputName.style.borderBottom = '1px solid #B0B0B0'
    inputSecondName.style.borderBottom = '1px solid #B0B0B0'
    addUserChangeBtn.style.display = 'none';
    addUserBtn.style.display = 'block';
    cancel.style.display = 'inline';
    document.querySelector('.remove-block').style.display = 'none';
    sectionRemove.classList.add('display-none')
    sectionAdd.classList.remove('display-none');
    document.querySelector('.wrapper').classList.toggle('wrapper-active');
    document.querySelector('.add__user-title').textContent = 'Новый клиент'
    id.style.display = 'none';
  }


  document.addEventListener('DOMContentLoaded', () => {

    clearTimeout(time);
    time = setTimeout(loadListUsers, 500)
    drawArrowSort();
    addContactBtn.addEventListener('click', createContact);
    cancel.addEventListener('click', cancelForm);
    userClose.addEventListener('click', cancelForm)

    inputSecondName.addEventListener('input', inputPlaceholder(inputSecondName))
    inputName.addEventListener('input', inputPlaceholder(inputName))
    inputPatronymic.addEventListener('input', inputPlaceholder(inputPatronymic))

    searchInput.addEventListener('input', searchCLient)

    sortByIdBtn.addEventListener('click', sortById)
    sortByNameBtn.addEventListener('click', sortByName)
    sortByDateCreateBtn.addEventListener('click', sortByDateCreate)
    sortByDateChangeBtn.addEventListener('click', sortByDateChange)

    document.querySelector('.add__client').addEventListener('click', addClientOpenForm)

    addUserBtn.addEventListener('click', addUser)
    addUserChangeBtn.addEventListener('click', addUserChange)

    wrapper.addEventListener('click',  (e)=>{
      const modal = document.querySelector('.wrapper-active')
      const target = e.target;
      if(modal === target) cancelForm();
    })
  })
})()