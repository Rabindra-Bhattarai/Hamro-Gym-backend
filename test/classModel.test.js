const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const ClassMock = dbMock.define("Class", {
  name: "Test User",
  date: "2024-02-02",
  time: 30,
  duration: 20,
  maxCapacity: 100,
  currentCapacity: 10,
});

describe("Class Model", () => {
  it("should create a class", async () => {
    const class1 = await ClassMock.create({
        name: "New User",
        date: "2024-03-03",
        time: 40,
        duration: 30,
        maxCapacity: 90,
        currentCapacity: 80,
    });

    expect(class1.name).toBe("New User");
    expect(class1.date).toBe("2024-03-03");
    expect(class1.time).toBe(40);
    expect(class1.duration).toBe(30);
    expect(class1.maxCapacity).toBe(90); 
    expect(class1.currentCapacity).toBe(80);
  });

  it("should require a name and date", async () => {
    await expect(UserMock.create({})).rejects.toThrow();
  });
});