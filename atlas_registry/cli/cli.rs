//! This example demonstrates how to use the `odra-cli` tool to deploy and interact with a smart contract.

use flapper::flapper::Flapper;
use flipper::flipper::Flipper;
use odra::host::{HostEnv, NoArgs};
use odra_cli::{
    deploy::DeployScript,
    scenario::{Args, Error, Scenario, ScenarioMetadata},
    CommandArg, ContractProvider, DeployedContractsContainer, DeployerExt,
    OdraCli,
};

/// Deploys the `Flipper` and `Flapper` contracts.
pub struct ContractsDeployScript;

impl DeployScript for ContractsDeployScript {
    fn deploy(
        &self,
        env: &HostEnv,
        container: &mut DeployedContractsContainer,
    ) -> Result<(), odra_cli::deploy::Error> {
        let _ = Flipper::load_or_deploy(
            &env,
            NoArgs,
            container,
            250_000_000_000, // Adjust gas limit as needed
        )?;

        let _ = Flapper::load_or_deploy(
            &env,
            NoArgs,
            container,
            250_000_000_000, // Adjust gas limit as needed
        )?;

        Ok(())
    }
}

/// Scenario that registers an asset via `Flipper` and flaps via `Flapper`.
pub struct RegisterAsset;

impl Scenario for RegisterAsset {
    fn args(&self) -> Vec<CommandArg> {
        vec![]
    }

    fn run(
        &self,
        env: &HostEnv,
        container: &DeployedContractsContainer,
        _args: Args,
    ) -> Result<(), Error> {
        let mut flipper = container.contract_ref::<Flipper>(env)?;
        let mut flapper = container.contract_ref::<Flapper>(env)?;

        env.set_gas(50_000_000);
        flipper.try_register_asset()?;
        flapper.try_flap()?;

        Ok(())
    }
}

impl ScenarioMetadata for RegisterAsset {
    const NAME: &'static str = "register_asset";
    const DESCRIPTION: &'static str = "Registers an asset via the Flipper contract and flaps via Flapper.";
}

/// Main function to run the CLI tool.
pub fn main() {
    OdraCli::new()
        .about("CLI tool for atlas_registry smart contract")
        .deploy(ContractsDeployScript)
        .contract::<Flipper>()
        .contract::<Flapper>()
        .scenario(RegisterAsset)
        .build()
        .run();
}
