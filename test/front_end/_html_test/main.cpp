#include <iostream>
#include <string>
#include <list>
using namespace std;

class Car {
protected:
	string type;
	int id;
	double bill;
	double size;

	int parkTime;
	int waitTime;

	int parked = 0;
	int waited = 0;
public:
	void print() {
		cout << type << id << endl;
	}
	void setId(int id) { this->id = id; }
	double getSize() { return size; }
	int getParkTime() { return parkTime; }
	int getWaitTime() { return waitTime; }
	void setParked(int time) { parked = time; }
	void setWaited(int time) { waited = time; }
	int getParked() { return parked; }
	int getWaited() { return waited; }
	string getType() { return type; }
	int getId() { return id; }

};
class Scar : public Car {
public:
	Scar() {
		type = "S";
		size = 1;
		parkTime = 3;
		waitTime = 1;
		bill = 1.5;
	}
};
class Mcar : public Car {
public:
	Mcar() {
		type = "M";
		size = 1.5;
		parkTime = 2;
		waitTime = 2;
		bill = 3;
	}
};
class Lcar : public Car {
public:
	Lcar() {
		type = "L";
		size = 2;
		parkTime = 1;
		waitTime = 3;
		bill = 4.5;
	}
};

Car* createCar() {
	string s;
	char c;
	int id;
	cin >> s >> c >> id;
	if (s == "S") {
		Scar* scar = new Scar();
		scar->setId(id);
		return scar;
	}
	else if (s == "M") {
		Mcar* mcar = new Mcar();
		mcar->setId(id);
		return mcar;
	}
	else if (s == "L") {
		Lcar* lcar = new Lcar();
		lcar->setId(id);
		return lcar;
	}
	else {
		return NULL;
	}
}

class Park {
private:
	double space;
	double usedSpace = 0;
	list<Car*> cars;
	list<Car*> waitingCar;
	list<Car*> carsInSpace;
	string weather;
	double totalbills;

public:
	void setSpace(int space) { this->space = space; }
	void setWeather(string weather) { this->weather = weather; }

	void setCar() {
		string s;

		while (cin >> s) {
			if (s == "end") break;
			Car* car;
			car = createCar();
			cars.push_back(car);
		}
	}

	void print() {
		list<Car*>::iterator it;
		for (it = cars.begin(); it != cars.end(); it++) {
			Car* car = *it;
			car->print();
		}
		if (cars.empty()) cout << "empty";
	}
    /**
     * * 123
     * ? 123
     * ! 123
     * TODO: hello
     */

	void parking() {
		int time = 0;
		while (!cars.empty() || !carsInSpace.empty() || !waitingCar.empty())
		{
			//Out
			checkWaited(time);
			checkParked(time);

			// In
			if (!cars.empty()) {
				Car* car = cars.front();
				if ((space - usedSpace) >= car->getSize()) {
					// 有位置并且没有人等待，放入停车位
					if (waitingCar.empty()) {
						carsInSpace.push_back(car);
						car->setParked(time);
						cars.pop_front();
						usedSpace += car->getSize();

						cout << "1";
						//car->print();
						//cout << endl;
					}
					// 有位置并且有人等待，把waiting放入停车位
					else {
						Car* car = waitingCar.front();
						carsInSpace.push_back(car);
						car->setParked(time);
						waitingCar.pop_front();
						usedSpace += car->getSize();
						cout << "2";
					}
				}
				else { // 没位置，放入waiting
					waitingCar.push_back(car);
					car->setWaited(time);
					cars.pop_front();
					cout << "3";
				}
			}
			output();
			cout << endl;
			time++;
		}
	}
	void checkWaited(int time) {
		list<Car*>::iterator it;
		for (it = waitingCar.begin(); it != waitingCar.end(); ) {
			Car* car = *it;
			if ((time - car->getWaited()) >= car->getWaitTime()) {
				//cout << "outwait: " << car->getType() << car->getId() << endl;;
				it = waitingCar.erase(it);
			}
			else {
				it++;
			}
		}
	}
	void checkParked(int time) {
		list<Car*>::iterator it;
		for (it = carsInSpace.begin(); it != carsInSpace.end();) {
			Car* car = *it;
			if ((time - car->getParked()) >= car->getParkTime()) {
				//cout << "outpark: " << car->getType() << car->getId() << endl;
				usedSpace -= (*it)->getSize();
				it = carsInSpace.erase(it);
			}
			else {
				it++;
			}
		}
	}
	void output() {
		list<Car*>::iterator it;
		for (it = carsInSpace.begin(); it != carsInSpace.end(); it++) {
			Car* car = *it;
			cout << car->getType() << car->getId() << " " ;
		}
	}
	void empty() {
		if (carsInSpace.empty()) {
			cout << "NULL";
		}
	}
};

void input() {
	int space;
	string weather;
	cin >> space >> weather;

	Park park;
	park.setSpace(space);
	park.setWeather(weather);
	park.setCar();
	park.parking();
	park.empty();
}

int main() {
	input();
	return 0;
}