let items = JSON.parse(localStorage.getItem('items')) || [];
let reminderId = null;

// show items on page load
document.addEventListener('DOMContentLoaded', displayItems);

document.getElementById('addItemButton').addEventListener('click', () => {
  let name = document.getElementById('itemName').value.trim();
  let location = document.getElementById('itemLocation').value.trim();

  if (name === "") {
    alert("Enter an item name!");
    return;
  }

  items.push({ name, location });
  localStorage.setItem('items', JSON.stringify(items));
  displayItems();

  document.getElementById('itemName').value = "";
  document.getElementById('itemLocation').value = "";
});

document.getElementById('clearAllButton').addEventListener('click', () => {
  if (confirm("Clear all items?")) {
    items = [];
    localStorage.removeItem('items');
    displayItems();
  }
});

function displayItems() {
  let list = document.getElementById('itemList');
  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = "<li><em>No items yet</em></li>";
    return;
  }

  items.forEach((item, i) => {
    let li = document.createElement('li');
    li.textContent = (i+1) + ". " + item.name + " (" + (item.location || "no location") + ")";
    list.appendChild(li);
  });
}

document.getElementById('setReminderButton').addEventListener('click', () => {
  let minutes = parseInt(document.getElementById('reminderInterval').value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Enter a valid number of minutes");
    return;
  }

  if (reminderId) clearInterval(reminderId);

  reminderId = setInterval(() => {
    if (items.length > 0) {
      alert("Check your pockets! Items: " + items.map(i => i.name).join(", "));
    } else {
      alert("Check your pockets!");
    }
  }, minutes * 60 * 1000);

  alert("Reminder set for every " + minutes + " minutes");
});

document.getElementById('cancelReminderButton').addEventListener('click', () => {
  if (reminderId) {
    clearInterval(reminderId);
    reminderId = null;
    alert("Reminders canceled");
  }
});
