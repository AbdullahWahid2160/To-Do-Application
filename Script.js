const AddTasks = document.querySelector('.input-flexbox');
const ToDoNotesList = document.querySelector('.ToDoUnorderedlist');
const DoneNotesList = document.querySelector('.DoneUnorderedlist');
const ToDoHeading = document.querySelector('.ToDoHeading');
const DoneHeading = document.querySelector('.DoneHeading');
const ColorPicker = document.querySelector('.ColorPicker');
const Notes = JSON.parse(localStorage.getItem('PendingNotes')) || [];
const DoneTasks = JSON.parse(localStorage.getItem('DoneTasks')) || [];

function HandleSubmission(e) {
  e.preventDefault();
  const Text = this.querySelector('[name="item"]').value;
  const TaskColor = this.querySelector('[name="color"]').value;
  console.log('Task Color : ', TaskColor);
  if (Text !== '') {
    const Note = {
      Text,
      BackgroundColor: TaskColor,
    };
    Notes.push(Note);
    localStorage.setItem('PendingNotes', JSON.stringify(Notes));
    PopulateToDoList(Notes, ToDoNotesList);
    this.reset();
  } else {
    return;
  }
}

function HandleClick(event) {
  var ElementClicked;
  var Index;
  if (!event.target.matches('path') && !event.target.matches('svg')) return;
  if (event.target.closest('.trashcan-icon')) {
    Index = event.target.dataset.index;
    if (event.target.closest('.to-do-list-flexbox')) {
      delete Notes[Index];
      localStorage.setItem('PendingNotes', JSON.stringify(Notes));
      PopulateToDoList(Notes, ToDoNotesList);
    } else if (event.target.closest('.done-list-flexbox')) {
      delete DoneTasks[Index];
      localStorage.setItem('DoneTasks', JSON.stringify(DoneTasks));
      PopulateDoneList(DoneTasks, DoneNotesList);
    }
    if (DoneNotesList.childElementCount == 0) {
      DoneHeading.style['visibility'] = 'hidden';
    }
    if (ToDoNotesList.childElementCount == 0) {
      ToDoHeading.style['visibility'] = 'hidden';
    }
  } else if (event.target.matches('[id=UncheckedIcon]')) {
    ElementClicked = event.target;
    Index = ElementClicked.dataset.index;
    console.log('Index: ', Index);
    DoneTasks.push(Notes[Index]);
    delete Notes[Index];
    localStorage.setItem('PendingNotes', JSON.stringify(Notes));
    localStorage.setItem('DoneTasks', JSON.stringify(DoneTasks));
    PopulateToDoList(Notes, ToDoNotesList);
    PopulateDoneList(DoneTasks, DoneNotesList);
    if (ToDoNotesList.childElementCount == 0) {
      ToDoHeading.style['visibility'] = 'hidden';
    }
  }
}

function PopulateToDoList(Notes, ToDoNotesList) {
  console.log('Items : ', ToDoNotesList.childElementCount);
  ToDoNotesList.innerHTML = Notes.map((Note, i) => {
    if (Note != null) {
      return `
      <div class="to-do-list-flexbox" style="background:${Note.BackgroundColor}">
      <div class="to-do-item">${Note.Text}</div>
      <!--Adding icons for interaction -->
      <div class="trashcan-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512
                    512"
                    id="DeleteIcon"
                    data-index=${i}
      >
        <path
        id="DeleteIcon"
        data-index=${i}
          d="M128 405.429C128 428.846 147.198 448 170.667
                        448h170.667C364.802 448 384 428.846 384
                        405.429V160H128v245.429zM416
                        96h-80l-26.785-32H202.786L176 96H96v32h320V96z"
        />
      </svg>
      </div>
      <div class="done-unfilled-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512
                        512"
                        id="UncheckedIcon"
                        data-index=${i}
      >
        <path
        id="UncheckedIcon"
        data-index=${i}
          d="M170.718 216.482L141.6 245.6l93.6 93.6
                            208-208-29.118-29.118L235.2
                            279.918l-64.482-63.436zM422.4 256c0
                            91.518-74.883 166.4-166.4 166.4S89.6 347.518
                            89.6 256 164.482 89.6 256 89.6c15.6 0 31.2 2.082
                            45.764 6.241L334 63.6C310.082 53.2 284.082 48
                            256 48 141.6 48 48 141.6 48 256s93.6 208 208 208
                            208-93.6 208-208h-41.6z"
        />
      </svg>
      </div>
    </div>
      `;
    }
  }).join('');
  if (ToDoNotesList.childElementCount !== 0) {
    ToDoHeading.style['visibility'] = 'visible';
  }
}

function PopulateDoneList(Notes, DoneNotesList) {
  console.log('Item: ', Notes);
  DoneNotesList.innerHTML = Notes.map((Note, i) => {
    if (Note != null) {
      return `
      <div class="done-list-flexbox" style="background:${Note.BackgroundColor}">
      <div class="to-do-item">${Note.Text}</div>
      <!--Adding icons for interaction -->
      <div class="trashcan-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512
                    512"
                    id="DeleteIcon"
                    data-index=${i}
      >
        <path
        id="DeleteIcon"
        data-index=${i}
          d="M128 405.429C128 428.846 147.198 448 170.667
                        448h170.667C364.802 448 384 428.846 384
                        405.429V160H128v245.429zM416
                        96h-80l-26.785-32H202.786L176 96H96v32h320V96z"
        />
      </svg>
      </div>
      <div class="done-filled-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 48C141.6 48 48
                                                        141.6 48 256s93.6 208
                                                        208 208 208-93.6
                                                        208-208S370.4 48 256
                                                        48zm-42.7 318.9L106.7
                                                        260.3l29.9-29.9 76.8
                                                        76.8 162.1-162.1 29.9
                                                        29.9-192.1 191.9z"
            />
          </svg>
        </div>
    </div>
      `;
    }
  }).join('');
  if (DoneNotesList.childElementCount !== 0) {
    DoneHeading.style['visibility'] = 'visible';
  }
  console.log('Checked');
}

function HandleColorChange() {
  TaskColor = this.value;
}

ColorPicker.addEventListener('input', HandleColorChange);

AddTasks.addEventListener('submit', HandleSubmission);
ToDoNotesList.addEventListener('click', HandleClick);
DoneNotesList.addEventListener('click', HandleClick);
PopulateToDoList(Notes, ToDoNotesList);
PopulateDoneList(DoneTasks, DoneNotesList);

// const addItems = document.querySelector('.add-items');
// const itemsList = document.querySelector('.plates');
// const items = JSON.parse(localStorage.getItem('items')) || [];

// function addItem(e) {
//   e.preventDefault();
//   const text = this.querySelector('[name=item]').value;
//   const item = {
//     text,
//     done: false,
//   };

//   items.push(item);
//   populateList(items, itemsList);
//   localStorage.setItem('items', JSON.stringify(items));
//   this.reset();
// }

// function populateList(plates = [], platesList) {
//   platesList.innerHTML = plates
//     .map((plate, i) => {
//       return `
//         <li>
//           <input type="checkbox" data-index=${i} id="item${i}" ${
//         plate.done ? 'checked' : ''
//       } />
//           <label for="item${i}">${plate.text}</label>
//         </li>
//       `;
//     })
//     .join('');
// }

// function toggleDone(e) {
//   if (!e.target.matches('input')) return; // skip this unless it's an input
//   const el = e.target;
//   const index = el.dataset.index;
//   items[index].done = !items[index].done;
//   localStorage.setItem('items', JSON.stringify(items));
//   populateList(items, itemsList);
// }

// addItems.addEventListener('submit', addItem);
// itemsList.addEventListener('click', toggleDone);

// populateList(items, itemsList);
