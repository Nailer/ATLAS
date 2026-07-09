// use odra::prelude::*;

// /// A module definition. Each module struct consists Vars and Mappings
// /// or/and another modules.
// #[odra::module]
// pub struct Flipper {
//     /// The module itself does not store the value,
//     /// it's a proxy that writes/reads value to/from the host.
//     value: Var<bool>,
// }

// /// Module implementation.
// /// 
// /// To generate entrypoints,
// /// an implementation block must be marked as #[odra::module].
// #[odra::module]
// impl Flipper {
//     /// Odra constructor.
//     /// 
//     /// Initializes the contract.
//     pub fn init(&mut self) {
//         self.value.set(false);
//     }

//     /// Replaces the current value with the passed argument.
//     pub fn set(&mut self, value: bool) {
//         self.value.set(value);
//     }

//     /// Replaces the current value with the opposite value.
//     pub fn flip(&mut self) {
//         self.value.set(!self.get());
//     }

//     /// Retrieves value from the storage. 
//     /// If the value has never been set, the default value is returned.
//     pub fn get(&self) -> bool {
//         self.value.get_or_default()
//     }
// }

// #[cfg(test)]
// mod tests {
//     use crate::flipper::Flipper;
//     use odra::host::{Deployer, NoArgs};

//     #[test]
//     fn flipping() {
//         let env = odra_test::env();
//         // To test a module we need to deploy it. `Flipper` implements `Deployer` trait, 
//         // so we can use it to deploy the module.
//         let mut contract = Flipper::deploy(&env, NoArgs);
//         assert!(!contract.get());
//         contract.flip();
//         assert!(contract.get());
//     }
// }




use odra::prelude::*;

#[odra::module]
pub struct Flipper {
    total_assets: Var<u32>,
}

#[odra::module]
impl Flipper {
    pub fn init(&mut self) {
        self.total_assets.set(0);
    }

    /// Registers a new tokenized asset and returns the new total count.
    /// In production this would also take the document fingerprint as an argument.
    pub fn register_asset(&mut self) -> u32 {
        let next = self.total_assets.get_or_default() + 1;
        self.total_assets.set(next);
        next
    }

    /// Returns how many assets have been registered so far.
    pub fn get_total_assets(&self) -> u32 {
        self.total_assets.get_or_default()
    }
}