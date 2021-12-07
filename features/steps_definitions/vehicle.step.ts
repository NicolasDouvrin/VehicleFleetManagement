// @ts-nocheck
import { Fleet } from "../../Domain/Models/Fleet";
import { Location } from "../../Domain/Models/Location";
import { Vehicle } from "../../Domain/Models/Vehicle";

const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");

// For this example, I decided to identify a vehicle by his name which is unique.
// This is more visual than a license plate.
// I also rename the features to launch them in a logical order


// *************
// Function Register
// *************
function registerVehicle(vehicle: Vehicle, fleet: Fleet, show: boolean): Fleet {
  let exist = false;
  fleet.vehicles.forEach((fleetVehicle) => {
    if (vehicle.name == fleetVehicle.name) {
      exist = true;
    }
  });
  if (exist == false) {
    fleet.vehicles.push(vehicle);
    if(show != false){
      console.log("Vehicle registered");
    }
    return fleet;
  } else {
    console.log("Vehicle already exist in fleet");
    return fleet;
  }
}


// *************
// Scenario 1 - Register
// *************
Given("my fleet", function () {
  this.fleet = new Fleet();
  this.fleet.id = "1";
  this.fleet.vehicles = [];
  let firstVehicle = new Vehicle();
  firstVehicle.name = "renault clio";
  let secondVehicle = new Vehicle();
  secondVehicle.name = "peugeot 208";
  this.fleet.vehicles.push(firstVehicle);
  this.fleet.vehicles.push(secondVehicle);
});
Given("a vehicle", function () {
  this.vehicle = new Vehicle();
  this.vehicle.name = "vw golf";
});
When("I register this vehicle into my fleet", function () {
  this.fleet = registerVehicle(this.vehicle, this.fleet);
});
Then("this vehicle should be part of my vehicle fleet", function () {
  const actualOutput = this.fleet;
  const expectedOutput: Fleet = {
    id: "1",
    vehicles: [
      {
        name: "renault clio",
      },
      {
        name: "peugeot 208",
      },
      {
        name: "vw golf",
      },
    ],
  };
  assert.deepEqual(actualOutput, expectedOutput);
});


// *************
// Scenario 2  - Register
// *************s
Given("I have registered this vehicle into my fleet", function () {
  this.fleet = registerVehicle(this.vehicle, this.fleet, false);
});
When("I try to register this vehicle into my fleet", function () {
  this.fleet = registerVehicle(this.vehicle, this.fleet);
});
Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    const actualOutput = this.fleet;
    const expectedOutput: Fleet = {
      id: "1",
      vehicles: [
        {
          name: "renault clio",
        },
        {
          name: "peugeot 208",
        },
        {
          name: "vw golf",
        },
      ],
    };
    assert.deepEqual(actualOutput, expectedOutput);
  }
);


// *************
// Scenario 3  - Register
// *************
Given("the fleet of another user", function () {
  this.otherFleet = new Fleet();
  this.otherFleet.id = "2";
  this.otherFleet.vehicles = [];
  let firstVehicle = new Vehicle();
  firstVehicle.name = "audi a3";
  let secondVehicle = new Vehicle();
  secondVehicle.name = "seat leon";
  this.otherFleet.vehicles.push(firstVehicle);
  this.otherFleet.vehicles.push(secondVehicle);
});
Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    this.otherFleet = registerVehicle(this.vehicle, this.otherFleet, false);
  }
);


// *************
// Function Park
// *************
function parkVehicle(fleet: Fleet, vehicle: Vehicle, location: Location, show: boolean) {
  fleet.vehicles.forEach((fleetVehicle) => {
    if (vehicle == fleetVehicle) {
      if (fleetVehicle.location == location) {
        console.log("Vehicle already parked");
        return fleet;
      } else {
        fleetVehicle.location = location;
        if(show != false){
          console.log("Vehicle parked");
        }
        return fleet;
      }
    }
  });
  return fleet;
}


// *************
// Scenario 4  - Park
// *************
Given("a location", function () {
  this.location = new Location();
  this.location.lng = "49.443232";
  this.location.lat = "1.099971";
});
When("I park my vehicle at this location", function () {
  this.fleet = parkVehicle(this.fleet, this.vehicle, this.location);
});
Then(
  "the known location of my vehicle should verify this location",
  function () {
    const actualOutput = this.fleet;
    const expectedOutput: Fleet = {
      id: "1",
      vehicles: [
        {
          name: "renault clio",
        },
        {
          name: "peugeot 208",
        },
        {
          name: "vw golf",
          location: { 
            lng: "49.443232",
            lat: "1.099971"
          }
        },
      ],
    };
    assert.deepEqual(actualOutput, expectedOutput);
  }
);


// *************
// Scenario 5  - Park
// *************
Given("my vehicle has been parked into this location", function () {
  this.fleet = parkVehicle(this.fleet, this.vehicle, this.location, false);
});
When("I try to park my vehicle at this location", function () {
  this.fleet = parkVehicle(this.fleet, this.vehicle, this.location);
});
Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    const actualOutput = this.fleet;
    const expectedOutput: Fleet = {
      id: "1",
      vehicles: [
        {
          name: "renault clio",
        },
        {
          name: "peugeot 208",
        },
        {
          name: "vw golf",
          location: { 
            lng: "49.443232",
            lat: "1.099971"
          }
        },
      ],
    };
    assert.deepEqual(actualOutput, expectedOutput);
  }
);
