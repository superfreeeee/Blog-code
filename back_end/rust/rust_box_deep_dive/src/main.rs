mod own_smart_pointer;
mod recursive_type;
mod reference_count;
mod reference_cell;
mod reference_cycles;
mod reference_cycles_prevent;

fn main() {
    own_smart_pointer::test();
    recursive_type::test();
    reference_count::test();
    reference_cell::test();
    reference_cycles::test();
    reference_cycles_prevent::test();
}
