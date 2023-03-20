import { ModuleReference } from "@concordium/web-sdk";
import { Buffer } from "buffer/";

// CIS2 contract info
const MULTI_CONTRACT_MODULE_REF =
  "312f99d6406868e647359ea816e450eac0ecc4281c2665a24936e6793535c9f6";
const MULTI_CONTRACT_SCHEMA =
  "ffff02010000000a000000636973325f6d756c7469000a0000000900000062616c616e63654f6606100114000200000008000000746f6b656e5f69641d0007000000616464726573731502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c10011b2500000015040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f7202040000006d696e7404140002000000050000006f776e65721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c06000000746f6b656e7312021d001b2500000015040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f72020f0000006f6e526563656976696e67434953320315040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f72020a0000006f70657261746f724f66061001140002000000050000006f776e65721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c07000000616464726573731502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c10010115040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f72020f000000736574496d706c656d656e746f72730414000200000002000000696416000c000000696d706c656d656e746f727310020c15040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720208000000737570706f727473061001160010011503000000090000004e6f537570706f72740207000000537570706f72740209000000537570706f72744279010100000010000c15040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f72020d000000746f6b656e4d657461646174610610011d0010011400020000000300000075726c160104000000686173681502000000040000004e6f6e650204000000536f6d65010100000013200000000215040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f7202080000007472616e7366657204100114000500000008000000746f6b656e5f69641d0006000000616d6f756e741b250000000400000066726f6d1502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c02000000746f1502000000070000004163636f756e7401010000000b08000000436f6e747261637401020000000c160104000000646174611d0115040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f72020e0000007570646174654f70657261746f720410011400020000000600000075706461746515020000000600000052656d6f7665020300000041646402080000006f70657261746f721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c15040000000e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640206000000437573746f6d010100000015060000000b0000005061727365506172616d7302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720204000000766965770114000200000005000000737461746510020f1502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c1400020000000800000062616c616e63657310020f1d001b25000000090000006f70657261746f727310021502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c06000000746f6b656e7310021d00";
export const CIS2_MULTI_CONTRACT_INFO = {
  contractName: "cis2_multi",
  moduleRef: new ModuleReference(MULTI_CONTRACT_MODULE_REF),
  schemaBuffer: Buffer.from(MULTI_CONTRACT_SCHEMA, "hex"),
  tokenIdByteSize: 1,
};

// PIXPEL contract info
const PIXPEL_SWAP_SCHEMA =
  "ffff02010000000b00000070697870656c5f7377617000140000000c0000006164644c69717569646974790414000200000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c0c000000746f6b656e5f616d6f756e741b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020900000062616c616e63654f6606100114000200000008000000746f6b656e5f69641d0007000000616464726573731502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c10011b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020e000000636364546f546f6b656e537761700414000200000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c100000006d696e5f746f6b656e5f616d6f756e741b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020e00000063726561746545786368616e67650414000100000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c696452657365727665730217000000676574436364546f546f6b656e53776170416d6f756e740614000200000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c080000006363645f736f6c641b2500000014000100000006000000616d6f756e741b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020b00000067657445786368616e67650614000200000006000000686f6c6465721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c05000000746f6b656e1400020000000200000069641d0007000000616464726573730c14000600000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c0d000000746f6b656e5f62616c616e63651b250000000b0000006363645f62616c616e63651b250000000b0000006c705f746f6b656e5f69641d00100000006c705f746f6b656e735f737570706c791b25000000180000006c705f746f6b656e735f686f6c6465725f62616c616e63651b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020c00000067657445786368616e6765730614000100000006000000686f6c6465721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c1400010000000900000065786368616e676573100214000600000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c0d000000746f6b656e5f62616c616e63651b250000000b0000006363645f62616c616e63651b250000000b0000006c705f746f6b656e5f69641d00100000006c705f746f6b656e735f737570706c791b25000000180000006c705f746f6b656e735f686f6c6465725f62616c616e63651b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c696452657365727665730217000000676574546f6b656e546f43636453776170416d6f756e740614000200000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c0a000000746f6b656e5f736f6c641b2500000014000100000006000000616d6f756e741b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c696452657365727665730219000000676574546f6b656e546f546f6b656e53776170416d6f756e740614000300000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c0f0000007075726368617365645f746f6b656e1400020000000200000069641d0007000000616464726573730c0a000000746f6b656e5f736f6c641b2500000014000100000006000000616d6f756e741b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c6964526573657276657302040000006d696e7404140002000000050000006f776e65721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c06000000746f6b656e7312021d001b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020f0000006f6e526563656976696e674349533203151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020a0000006f70657261746f724f66061001140002000000050000006f776e65721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c07000000616464726573731502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c100101151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020f00000072656d6f76654c69717569646974790414000200000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c0f0000006c705f746f6b656e5f616d6f756e741b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c696452657365727665730208000000737570706f727473061001160010011503000000090000004e6f537570706f72740207000000537570706f72740209000000537570706f72744279010100000010000c151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020d000000746f6b656e4d657461646174610610011d0010011400020000000300000075726c160104000000686173681502000000040000004e6f6e650204000000536f6d650101000000132000000002151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020e000000746f6b656e546f436364537761700414000300000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c0a000000746f6b656e5f736f6c641b250000000e0000006d696e5f6363645f616d6f756e741b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c696452657365727665730210000000746f6b656e546f546f6b656e537761700414000400000005000000746f6b656e1400020000000200000069641d0007000000616464726573730c0f0000007075726368617365645f746f6b656e1400020000000200000069641d0007000000616464726573730c0a000000746f6b656e5f736f6c641b250000001a0000006d696e5f7075726368617365645f746f6b656e5f616d6f756e741b25000000151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c6964526573657276657302080000007472616e7366657204100114000500000008000000746f6b656e5f69641d0006000000616d6f756e741b250000000400000066726f6d1502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c02000000746f1502000000070000004163636f756e7401010000000b08000000436f6e747261637401020000000c160104000000646174611d01151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020e0000007570646174654f70657261746f720410011400020000000600000075706461746515020000000600000052656d6f7665020300000041646402080000006f70657261746f721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c69645265736572766573020400000076696577051400050000000900000065786368616e67657310021400030000000a000000746f6b656e5f696e666f1400020000000200000069641d0007000000616464726573730c0e00000065786368616e67655f73746174651400020000000b0000006c705f746f6b656e5f69641d000b0000006363645f62616c616e63651b250000000d000000746f6b656e5f62616c616e63651b250000000f0000006c705f746f6b656e735f737461746510020f1502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c1400020000000800000062616c616e63657310020f1d001b25000000090000006f70657261746f727310021502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c100000006c705f746f6b656e735f737570706c7910020f1d001b25000000100000006c6173745f6c705f746f6b656e5f69641d0014000000636f6e74726163745f6363645f62616c616e63650a151c000000100000005061727365506172616d734572726f72021000000045786368616e67654e6f74466f756e64021500000045786368616e6765416c726561647945786973747302070000004c6f6746756c6c020c0000004c6f674d616c666f726d65640213000000496e76616c6964436f6e74726163744e616d65020c000000436f6e74726163744f6e6c790213000000496e766f6b65436f6e74726163744572726f720216000000496e766f6b65436f6e74726163744e6f526573756c740213000000496e766f6b655472616e736665724572726f72020b0000005061727365506172616d73020b0000005061727365526573756c74020e000000496e76616c6964546f6b656e49640211000000496e73756666696369656e7446756e6473020c000000556e617574686f72697a65640216000000496e636f7272656374546f6b656e436364526174696f020c000000546f6b656e4e6f7443697332020b0000004e6f744f70657261746f72021100000043616c6c6564427941436f6e7472616374020e000000416d6f756e74546f6f4c61726765020e0000004d697373696e674163636f756e74020f0000004d697373696e67436f6e747261637402110000004d697373696e67456e747279706f696e74020d0000004d6573736167654661696c6564020b0000004c6f67696352656a656374000100000006000000726561736f6e0804000000547261700218000000496e73756666696369656e744f7574707574416d6f756e74020f000000496e76616c6964526573657276657302";
export const PIXPEL_SWAP_CONTRACT_INFO = {
  contractName: "pixpel_swap",
  schemaBuffer: Buffer.from(PIXPEL_SWAP_SCHEMA, "hex"),
};
