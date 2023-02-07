// An in-memory database with sample mock data

export const db = {
  items: [
    {
      id: 1,
      name: "Wrench",
      category: "Home Improvement",
      value: 6
    },
    {
      id: 2,
      name: "Hammer",
      category: "Home Improvement",
      value: 4
    },
    {
      id: 3,
      name: "Screwdriver",
      category: "Home Improvement",
      value: 2
    },
    {
      id: 4,
      name: "Scissors",
      category: "Office",
      value: 3
    },
    {
      id: 5,
      name: "Paper Clip",
      category: "Office",
      value: 1
    }
  ],
  addItem: (item) => {
    // Mock/In memory database
    db.items.push(item);
  },
  removeItem: (id) => {
    // Mock/In memory database
    const item = db.items.find((item) => item.id === id);
    const index = db.items.indexOf(item);
    if (index > -1) {
      db.items.splice(index, 1);
    }
  },
  getAllItems: () => {
    return db.items;
  },
  getItem: (id) => {
    return db.items.find((item) => item.id === id);
  },
  updateItem: (item) => {
    const index = db.items.indexOf(db.getItem(item.id));
    if (index > -1) {
      db.items.splice(index, 1, item);
    }
  }
};
