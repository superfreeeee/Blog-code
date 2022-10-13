type ObjectDesc<D, M> = {
  data: D;
  methods: M & ThisType<D & M>;
};

function makeObject<D, M>(desc: ObjectDesc<D, M>): D & M {
  return { ...desc.data, ...desc.methods };
}

makeObject({
  data: {
    name: 'superfree',
    age: 22,
  },
  methods: {
    introduce() {
      console.log(`My name is ${this.name}, and I am ${this.age} years old`);
    },
  },
});
