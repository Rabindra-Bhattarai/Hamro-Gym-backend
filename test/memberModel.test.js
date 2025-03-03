const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const MemberMock = dbMock.define("Member", {
  fullname: "Test User",
  email: "test@gmail.com",
  phonenumber: "9809809800",
  address: "Testing Avenue",
  password: "Test@123",
  role: "member",
  membershipType:"basic",
  startDate:"2024-06-06",
  expiryDate:"2024-07-06",
  status: "active"
});

describe("Member Model", () => {
  it("should create a member", async () => {
    const member = await MemberMock.create({
        fullname: "New User",
        email: "new@gmail.com",
        phonenumber: "9809809810",
        address: "Testing Avenue",
        password: "User@123",
        role: "member",
        membershipType:"basic",
  startDate:"2024-06-06",
  expiryDate:"2024-07-06",
  status: "active"
    });

    expect(member.fullname).toBe("New User");
    expect(member.email).toBe("new@gmail.com");
    expect(member.phonenumber).toBe("9809809810");
    expect(member.address).toBe("Testing Avenue");
    expect(member.password).toBe("User@123"); 
    expect(member.role).toBe("member");
  });

  it("should require a username and email", async () => {
    await expect(UserMock.create({})).rejects.toThrow();
  });
});