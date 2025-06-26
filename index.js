const form = document.getElementById('guest-form');
const nameInput = document.getElementById('guest-name');
const categorySelect = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');

let guestArray = [];

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (guestArray.length >= 10) {
    alert('Guest list is full! Only 10 guests allowed.');
    return;
  }

  const guestName = nameInput.value.trim();
  const guestCategory = categorySelect.value;

  if (guestName === '') return;

  const newGuest = {
    id: Date.now(),
    name: guestName,
    category: guestCategory,
    attending: false
  };

  guestArray.push(newGuest);
  clearForm();
  updateGuestList();
});

// Clear input fields
function clearForm() {
  nameInput.value = '';
  categorySelect.value = 'Friend';
}

// Render all guests
function updateGuestList() {
  guestList.innerHTML = '';

  guestArray.forEach(guest => {
    const listItem = createGuestItem(guest);
    guestList.appendChild(listItem);
  });
}

// Create a guest <li> element
function createGuestItem(guest) {
  const li = document.createElement('li');
  li.className = guest.attending ? 'attending' : 'not-attending';

  // Category badge
  const categoryBadge = document.createElement('span');
  categoryBadge.className = `tag ${guest.category.toLowerCase()}`;
  categoryBadge.textContent = guest.category;
  categoryBadge.style.marginRight = '10px';

  // Guest name and status
  const guestInfo = document.createElement('span');
  guestInfo.textContent = `${guest.name} - ${guest.attending ? 'Attending' : 'Not Attending'}`;
  guestInfo.style.marginRight = '10px';

  // Toggle attendance button
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = guest.attending ? 'Mark Not Attending' : 'Mark Attending';
  toggleBtn.style.marginRight =
