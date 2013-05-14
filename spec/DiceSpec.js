describe("Dice", function() {
  var dice;

  it("should be intialized correctly", function() {
    dice = new Dice(20, 5);
    expect(dice.sides).toEqual(20);
    expect(dice.quantity).toEqual(5);
  });

  it("should default the quantity to 1", function() {
    dice = new Dice(20);
    expect(dice.sides).toEqual(20);
    expect(dice.quantity).toEqual(1);
  });

  describe("#roll", function() {
    it("should call #_randomNumber with the sides value", function() {
      dice = new Dice(6, 1);
      spyOn(dice, '_randomNumber').andCallThrough();
      dice.roll();
      expect(dice._randomNumber).toHaveBeenCalledWith(6);
    });

    it("should return the sum of rolling all dice", function() {
      dice = new Dice(20, 2);
      spyOn(dice, '_randomNumber').andReturn(15);
      expect(dice.roll()).toEqual(30);
    });
  });
});