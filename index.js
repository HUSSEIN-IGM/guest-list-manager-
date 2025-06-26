const form = document.getElementById('guest-form');
const input = document.getElementById('guest-name');
const categorySelect = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');

let guests = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (guests.length >= 10) {
    alert('Guest list is full! (Max 10 guests)');
    return;
  }

  const name = input.value.trim();
  const category = categorySelect.value;

  if (!name) return;

  const guest = {
    id: Date.now(),
    name: name,
    attending: false, // default status
    category: category
  };

  guests.push(guest);
  input.value = '';
  categorySelect.value = 'Friend';
  renderGuests();
});

function renderGuests() {
  guestList.innerHTML = '';

  guests.forEach(guest => {
    const li = document.createElement('li');
    li.className = guest.attending ? 'attending' : 'not-attending';

    // Category tag
    const tag = document.createElement('span');
    tag.className = `tag ${guest.category.toLowerCase()}`;
    tag.textContent = guest.category;
    tag.style.marginRight = '10px';

    // Guest name and status
    const guestText = document.createElement('span');
    guestText.textContent = `${guest.name} - ${guest.attending ? 'Attending' : 'Not Attending'}`;
    guestText.style.marginRight = '10px';

    // RSVP button
    const rsvpBtn = document.createElement('button');
    rsvpBtn.textContent = guest.attending ? 'Mark Not Attending' : 'Mark Attending';
    rsvpBtn.style.marginRight = '5px';
    rsvpBtn.addEventListener('click', () => {
      guest.attending = !guest.attending;
      renderGuests();
    });

    // Remove button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Remove';
    delBtn.addEventListener('click', () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    });

    li.append(tag, guestText, rsvpBtn, delBtn);
    guestList.appendChild(li);
  });
}        check ai chatgpt content
