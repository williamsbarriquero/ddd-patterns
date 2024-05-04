import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            new Order("123", "", []);
        }).toThrowError("customerId is required");
    });

    it("should throw error when items are empty", () => {
        expect(() => {
            new Order("123", "123", []);
        }).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100);
        const order = new Order("o1", "c1", [item])
        const item2 = new OrderItem("i2", "Item 2", 200);

        let total = order.total();
        expect(total).toBe(100);

        const order2 = new Order("o2", "c1", [item, item2])
        total = order2.total();
        expect(total).toBe(300);
    });
});