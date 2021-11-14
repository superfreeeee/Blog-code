pub mod primitive;
pub mod function;
pub mod loop_stmt;
pub mod ownership;
pub mod reference;
pub mod slice;
pub mod struct_tuple;
pub mod enum_type;
pub mod module;
pub mod error_handle;
pub mod generic;
pub mod trait_feature;
pub mod lifecycle;
pub mod fs_and_io;
pub mod collection_vector;
pub mod collection_string;
pub mod collection_hashmap;
pub mod object_oriented;

#[allow(dead_code)]
pub fn main() {
    primitive::test_primitive();
    function::test_function();
    loop_stmt::test_loop_stmt();
    ownership::test_ownership();
    reference::test_reference();
    slice::test_slice();
    struct_tuple::test_struct_and_tuple();
    enum_type::test_enum();
    module::test_mod();
    error_handle::test_result();
    generic::test_generic();
    trait_feature::test_trait();
    lifecycle::test_lifecycle();
    fs_and_io::test_fs_and_io();
    collection_vector::test_vec();
    collection_string::test_string();
    collection_hashmap::test_hashmap();
    object_oriented::test_object_oriented();
}