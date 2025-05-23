import sequelize from "./db.js"
import Usuario from "./usuariosModel.js"
import Articulo from "./articulosModel.js"
import Categoria from "./categoriasModel.js"
import { fileURLToPath } from "url"
import fs from "fs"
import path, { dirname } from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function inicializarBase() {
    try {
        const archivo = path.join(__dirname, '.././data/pymes.db');
        if (fs.existsSync(archivo)) {
        }

        await sequelize.sync({ force: true });

        await DatosCategorias();
        await DatosArticulos();
        await DatosUsuarios();

        console.log('Base de datos inicializada y datos de prueba creados.');

    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
}

async function DatosCategorias() {
    await Categoria.bulkCreate([
        { idCategoria: 1, nombre: 'ACCESORIOS' },
        { idCategoria: 2, nombre: 'AUDIO' },
        { idCategoria: 3, nombre: 'CELULARES' },
        { idCategoria: 4, nombre: 'CUIDADO PERSONAL' },
        { idCategoria: 5, nombre: 'DVD' },
        { idCategoria: 6, nombre: 'FOTOGRAFIA' },
        { idCategoria: 7, nombre: 'FRIO-CALOR' },
        { idCategoria: 8, nombre: 'GPS' },
        { idCategoria: 9, nombre: 'INFORMATICA' },
        { idCategoria: 10, nombre: 'LED - LCD' },
    ]);
}

async function DatosUsuarios() {
    await Usuario.bulkCreate([
        { clave: 1, nombre: 'admin', clave: '123', rol: 'jefe' },
        { clave: 2, nombre: 'juan', clave: '123', rol: 'empleado' },
        { clave: 3, nombre: 'ana', clave: 'ana123', rol: 'empleado' }
    ]);
}

async function DatosArticulos() {
    await Articulo.bulkCreate([
        { id: 1, nombre: 'KIT DIRECT TV PREPA 0.60MT', precio: 299.00, codigoDeBarra: '0779815559001', idCategoria: 10, stock: 329, fechaAlta: '2017-01-19', activo: true },
        { id: 2, nombre: 'KIT DIRECT TV PREPA 0.90MT', precio: 349.00, codigoDeBarra: '0779815559002', idCategoria: 10, stock: 468, fechaAlta: '2017-01-31', activo: true },
        { id: 3, nombre: 'LED 22" LG FHD 22MN42APM', precio: 2669.00, codigoDeBarra: '0779808338808', idCategoria: 10, stock: 536, fechaAlta: '2017-01-12', activo: true },
        { id: 4, nombre: 'LED 24" ILO HD DIGITAL MOD LDH24ILO02', precio: 2999.00, codigoDeBarra: '0779696260024', idCategoria: 10, stock: 169, fechaAlta: '2017-01-30', activo: true },
        { id: 5, nombre: 'LED 24" LG HD 24MN42A-PM', precio: 3129.00, codigoDeBarra: '0779808338809', idCategoria: 10, stock: 296, fechaAlta: '2016-12-28', activo: true },
        { id: 7, nombre: 'LED 32" BGH HD BLE3214D', precio: 4830.00, codigoDeBarra: '0779688540133', idCategoria: 10, stock: 998, fechaAlta: '2017-01-01', activo: true },
        { id: 8, nombre: 'LED 32" BGH SMART TV BLE3213RT', precio: 5405.00, codigoDeBarra: '0779688540117', idCategoria: 10, stock: 650, fechaAlta: '2017-01-18', activo: true },
        { id: 9, nombre: 'LED 32" HISENSE IPTV HLE3213RT', precio: 5290.00, codigoDeBarra: '0779688540119', idCategoria: 10, stock: 51, fechaAlta: '2017-02-03', activo: true },
        { id: 10, nombre: 'LED 32" HITACHI HD CDHLE32FD10', precio: 4837.00, codigoDeBarra: '0779694109973', idCategoria: 10, stock: 838, fechaAlta: '2016-12-25', activo: true },
        { id: 11, nombre: 'LED 32" ILO HD DIGITAL LDH32ILO02', precio: 4199.00, codigoDeBarra: '0779696260132', idCategoria: 10, stock: 501, fechaAlta: '2017-01-25', activo: true },
        { id: 12, nombre: 'LED 32" JVC HD IPTV LT32DR930', precio: 6699.00, codigoDeBarra: '0779818058057', idCategoria: 10, stock: 906, fechaAlta: '2017-01-25', activo: true },
        { id: 13, nombre: 'LED 32" JVC HD LT32DA330', precio: 4499.00, codigoDeBarra: '0779696266323', idCategoria: 10, stock: 435, fechaAlta: '2017-02-07', activo: true },
        { id: 14, nombre: 'LED 32" LG 3D 32LA613B', precio: 6299.00, codigoDeBarra: '0779808338816', idCategoria: 10, stock: 329, fechaAlta: '2017-02-06', activo: true },
        { id: 15, nombre: 'LED 32" PHILIPS FHD 32PFL3018D/77', precio: 6799.00, codigoDeBarra: '0871258168715', idCategoria: 10, stock: 971, fechaAlta: '2016-12-25', activo: true },
        { id: 16, nombre: 'LED 32" PHILIPS FHD IPTV 32PFL4508G/77', precio: 7699.00, codigoDeBarra: '0871258167198', idCategoria: 10, stock: 636, fechaAlta: '2017-02-07', activo: true },
        { id: 17, nombre: 'LED 32" PHILIPS HD 32PFL3008D/77', precio: 5799.00, codigoDeBarra: '0871258167218', idCategoria: 10, stock: 67, fechaAlta: '2016-12-27', activo: true },
        { id: 18, nombre: 'LED 32" PHILIPS SMART TV 32PFL3518G/77', precio: 7399.00, codigoDeBarra: '0871258167225', idCategoria: 10, stock: 250, fechaAlta: '2017-01-08', activo: true },
        { id: 19, nombre: 'LED 32" RCA HD L32S80DIGI', precio: 4499.00, codigoDeBarra: '0779694101214', idCategoria: 10, stock: 857, fechaAlta: '2017-01-23', activo: true },
        { id: 20, nombre: 'LED 32" SAMSUNG FHD UN32F5000', precio: 6094.00, codigoDeBarra: '0880608543154', idCategoria: 10, stock: 636, fechaAlta: '2016-12-30', activo: true },
        { id: 21, nombre: 'LED 32" SAMSUNG HD UN32F4000', precio: 5519.00, codigoDeBarra: '0880608543153', idCategoria: 10, stock: 37, fechaAlta: '2017-01-23', activo: true },
        { id: 22, nombre: 'LED 32" SAMSUNG SMART UN32F5500', precio: 6899.00, codigoDeBarra: '0880608548607', idCategoria: 10, stock: 214, fechaAlta: '2017-01-24', activo: true },
        { id: 23, nombre: 'LED 32" SONY HD KDL32R425', precio: 6199.00, codigoDeBarra: '0490552491740', idCategoria: 10, stock: 642, fechaAlta: '2017-01-17', activo: true },
        { id: 24, nombre: 'LED 32" SONY SMART TV KDL32W655', precio: 6999.00, codigoDeBarra: '0490552491687', idCategoria: 10, stock: 50, fechaAlta: '2017-02-04', activo: true },
        { id: 25, nombre: 'LED 39" ILO DIG FHD LDF39ILO2', precio: 5699.00, codigoDeBarra: '0779696260394', idCategoria: 10, stock: 951, fechaAlta: '2017-01-19', activo: true },
        { id: 26, nombre: 'LED 39" PHILIPS FHD IPTV 39PFL3508G/77', precio: 8799.00, codigoDeBarra: '0871258168717', idCategoria: 10, stock: 889, fechaAlta: '2017-02-03', activo: true },
        { id: 27, nombre: 'LED 39" RCA FHD L39S85DIGIFHD', precio: 6499.00, codigoDeBarra: '0779694101215', idCategoria: 10, stock: 487, fechaAlta: '2016-12-25', activo: true },
        { id: 28, nombre: 'LED 40" BGH FHD BLE4014D', precio: 7245.00, codigoDeBarra: '0779688540132', idCategoria: 10, stock: 480, fechaAlta: '2016-12-27', activo: true },
        { id: 29, nombre: 'LED 40" SAMSUNG 3D SMART UN40F6800', precio: 13224.00, codigoDeBarra: '0880608565606', idCategoria: 10, stock: 734, fechaAlta: '2017-01-26', activo: true },
        { id: 30, nombre: 'LED 40" SAMSUNG 3D UN40F6100', precio: 9999.00, codigoDeBarra: '0880608544958', idCategoria: 10, stock: 835, fechaAlta: '2017-01-19', activo: true },
        { id: 31, nombre: 'LED 40" SAMSUNG FHD UN40F5000', precio: 8164.00, codigoDeBarra: '0880608543156', idCategoria: 10, stock: 436, fechaAlta: '2017-02-01', activo: true },
        { id: 32, nombre: 'LED 40" SAMSUNG SMART UN40F5500', precio: 9774.00, codigoDeBarra: '0880608565438', idCategoria: 10, stock: 639, fechaAlta: '2017-01-20', activo: true },
        { id: 33, nombre: 'LED 40" SONY FHD KDL40R485', precio: 7499.00, codigoDeBarra: '0490552493532', idCategoria: 10, stock: 862, fechaAlta: '2017-01-07', activo: true },
        { id: 34, nombre: 'LED 42" LG 3D 42LA6130', precio: 9199.00, codigoDeBarra: '0779808338817', idCategoria: 10, stock: 560, fechaAlta: '2017-01-05', activo: true },
        { id: 35, nombre: 'LED 42" LG FHD 42LN5400', precio: 8099.00, codigoDeBarra: '0779808338818', idCategoria: 10, stock: 48, fechaAlta: '2017-01-28', activo: true },
        { id: 36, nombre: 'LED 42" LG SMART TV 42LN5700', precio: 9799.00, codigoDeBarra: '0779808338823', idCategoria: 10, stock: 967, fechaAlta: '2017-01-27', activo: true },
        { id: 37, nombre: 'LED 42" PANASONIC 3D SMART TV TCL42ET60', precio: 11249.00, codigoDeBarra: '0779805518074', idCategoria: 10, stock: 570, fechaAlta: '2017-01-19', activo: true },
        { id: 38, nombre: 'LED 42" PHILIPS 3D SMART TV 42PFL5008G/7', precio: 11599.00, codigoDeBarra: '0871258167039', idCategoria: 10, stock: 802, fechaAlta: '2017-02-04', activo: true },
        { id: 39, nombre: 'LED 42" PHILIPS FHD 42PFL3008D/77', precio: 8499.00, codigoDeBarra: '0871258167221', idCategoria: 10, stock: 193, fechaAlta: '2017-02-04', activo: true },
        { id: 40, nombre: 'LED 42" PHILIPS SMART TV 42PFL3508G/77', precio: 9499.00, codigoDeBarra: '0871258167227', idCategoria: 10, stock: 693, fechaAlta: '2016-12-30', activo: true },
        { id: 41, nombre: 'LED 42" PIONEER 3D SMART PLE42FZP2', precio: 12299.00, codigoDeBarra: '0498802821943', idCategoria: 10, stock: 907, fechaAlta: '2017-02-01', activo: true },
        { id: 42, nombre: 'LED 42" SONY FHD KDL42R475', precio: 7999.00, codigoDeBarra: '0490552491728', idCategoria: 10, stock: 140, fechaAlta: '2017-01-13', activo: true },
        { id: 43, nombre: 'LED 46" PHILIPS SMART TV 46PFL4508G/7', precio: 13999.00, codigoDeBarra: '0871258168718', idCategoria: 10, stock: 236, fechaAlta: '2017-01-31', activo: true },
        { id: 44, nombre: 'LED 46" SAMSUNG 3D SMART TV UN46F7500', precio: 23574.00, codigoDeBarra: '0880608565943', idCategoria: 10, stock: 143, fechaAlta: '2016-12-25', activo: true },
        { id: 45, nombre: 'LED 46" SAMSUNG SMART UN46F5500', precio: 13224.00, codigoDeBarra: '0880608548610', idCategoria: 10, stock: 345, fechaAlta: '2017-01-07', activo: true },
        { id: 46, nombre: 'LED 46" SANYO SMART TV LCE46IF12', precio: 10599.00, codigoDeBarra: '0779696260612', idCategoria: 10, stock: 557, fechaAlta: '2017-02-03', activo: true },
        { id: 47, nombre: 'LED 47" LG SMART TV 47LN5700', precio: 13199.00, codigoDeBarra: '0779808338824', idCategoria: 10, stock: 599, fechaAlta: '2017-01-20', activo: true },
        { id: 48, nombre: 'LED 47" PIONEER 3D SMART PLE47FZP1', precio: 15999.00, codigoDeBarra: '0498802821947', idCategoria: 10, stock: 310, fechaAlta: '2017-02-07', activo: true },
        { id: 49, nombre: 'LED 47" SONY 3D SMART TV KDL47W805', precio: 17199.00, codigoDeBarra: '0490552494098', idCategoria: 10, stock: 526, fechaAlta: '2017-01-31', activo: true },
        { id: 50, nombre: 'LED 55" NOBLEX 3D IPTV 55LD856DI', precio: 20799.00, codigoDeBarra: '0779696260000', idCategoria: 10, stock: 362, fechaAlta: '2017-01-26', activo: true },
        { id: 51, nombre: 'LED 55" PHILIPS 3D SMART TV 55PFL8008G/77', precio: 29999.00, codigoDeBarra: '0871258166949', idCategoria: 10, stock: 841, fechaAlta: '2017-01-06', activo: true },
        { id: 52, nombre: 'SOPORTE LCD / LED DE 14" A 42" TANGWOOD', precio: 599.00, codigoDeBarra: '0779814176493', idCategoria: 10, stock: 527, fechaAlta: '2017-02-07', activo: true },
        { id: 53, nombre: 'SOPORTE LCD / LED DE 17 \'\' A 40 \'\'', precio: 499.00, codigoDeBarra: '0779814176654', idCategoria: 10, stock: 588, fechaAlta: '2016-12-23', activo: true },
        { id: 54, nombre: 'SOPORTE LCD / LED DE 17" A 37" TANGWOOD', precio: 225.00, codigoDeBarra: '0779814176489', idCategoria: 10, stock: 687, fechaAlta: '2017-01-29', activo: true },
        { id: 55, nombre: 'SOPORTE LCD / LED DE 23 \'\' A 50 \'\'', precio: 350.00, codigoDeBarra: '0779814176652', idCategoria: 10, stock: 519, fechaAlta: '2016-12-25', activo: true },
        { id: 56, nombre: 'SOPORTE LCD / LED DE 26" A 47" TANGWOOD', precio: 350.00, codigoDeBarra: '0779814176442', idCategoria: 10, stock: 81, fechaAlta: '2017-01-28', activo: true },
        { id: 57, nombre: 'SOPORTE LCD / LED TGW DE 17 \'\' A 37 \'\'', precio: 199.00, codigoDeBarra: '0779814176648', idCategoria: 10, stock: 164, fechaAlta: '2017-01-17', activo: true },
        { id: 58, nombre: 'SOPORTE LCD 10" TAGWOOD', precio: 375.00, codigoDeBarra: '0779814176490', idCategoria: 10, stock: 217, fechaAlta: '2017-01-31', activo: true },
        { id: 59, nombre: 'SOPORTE LCD 32" NAKAN', precio: 199.00, codigoDeBarra: '0779803504550', idCategoria: 10, stock: 873, fechaAlta: '2017-01-01', activo: true },
        { id: 60, nombre: 'SOPORTE LCD 32" ONE FOR ALL', precio: 259.00, codigoDeBarra: '0871618404213', idCategoria: 10, stock: 585, fechaAlta: '2017-01-30', activo: true },
        { id: 61, nombre: 'SOPORTE LCD 40" ONE FOR ALL', precio: 519.00, codigoDeBarra: '0871618404215', idCategoria: 10, stock: 809, fechaAlta: '2017-01-22', activo: true },
        { id: 62, nombre: 'SOPORTE LCD/LED 23 A 46"', precio: 399.00, codigoDeBarra: '0779814176617', idCategoria: 10, stock: 470, fechaAlta: '2017-01-21', activo: true },
        { id: 68, nombre: 'SOPORTE GPS', precio: 119.00, codigoDeBarra: '0779814176084', idCategoria: 8, stock: 524, fechaAlta: '2017-01-14', activo: true },
        { id: 69, nombre: 'SOPORTE GPS NEGRO MOTO 3,5" - 5,5"', precio: 259.00, codigoDeBarra: '0779808004535', idCategoria: 8, stock: 800, fechaAlta: '2017-02-05', activo: true },
        { id: 70, nombre: 'GPS GARMIN NUVI 2595', precio: 2899.00, codigoDeBarra: '0075375999226', idCategoria: 8, stock: 745, fechaAlta: '2017-02-07', activo: true },
        { id: 71, nombre: 'GPS GARMIN NUVI 52', precio: 2149.00, codigoDeBarra: '0075375999808', idCategoria: 8, stock: 274, fechaAlta: '2016-12-22', activo: true },
        { id: 72, nombre: 'GPS X VIEW VENTURA TV 7"', precio: 1849.00, codigoDeBarra: '0779804220262', idCategoria: 8, stock: 150, fechaAlta: '2016-12-30', activo: true },
        { id: 73, nombre: 'GPS XVIEW VENTURA TV', precio: 1509.00, codigoDeBarra: '0779804220220', idCategoria: 8, stock: 183, fechaAlta: '2017-01-05', activo: true },
        { id: 74, nombre: 'MOUSE HP 2.4G SILVER WIRELESS OPT CAN/EN', precio: 199.00, codigoDeBarra: '0088496276058', idCategoria: 9, stock: 40, fechaAlta: '2017-02-03', activo: true },
        { id: 75, nombre: 'PENDRIVE KINGSTONE DT101G2 8GB', precio: 129.00, codigoDeBarra: '0074061716983', idCategoria: 9, stock: 537, fechaAlta: '2016-12-21', activo: true },
        { id: 76, nombre: 'PENDRIVE SANDISK BLADE 4GB', precio: 129.00, codigoDeBarra: '0061965900041', idCategoria: 9, stock: 340, fechaAlta: '2017-02-02', activo: true },
        { id: 77, nombre: 'PENDRIVE SANDISK CRUZAR ORBIT 8GB', precio: 159.00, codigoDeBarra: '0061965909040', idCategoria: 9, stock: 696, fechaAlta: '2017-02-07', activo: true },
        { id: 78, nombre: 'PENDRIVE SANDISK POP BLACK 8GB', precio: 159.00, codigoDeBarra: '0061965908448', idCategoria: 9, stock: 431, fechaAlta: '2017-01-08', activo: true },
        { id: 79, nombre: 'PENDRIVE SANDISK POP PAIN 8GB', precio: 159.00, codigoDeBarra: '0061965908156', idCategoria: 9, stock: 521, fechaAlta: '2017-02-01', activo: true },
        { id: 80, nombre: 'CARTUCHO EPSON 732 CYAN', precio: 10290.00, codigoDeBarra: '0001034385887', idCategoria: 9, stock: 234, fechaAlta: '2017-01-26', activo: true },
        { id: 81, nombre: 'CARTUCHO EPSON T133120-AL MAGENTA', precio: 9690.00, codigoDeBarra: '0001034387695', idCategoria: 9, stock: 374, fechaAlta: '2016-12-26', activo: true },
        { id: 82, nombre: 'CARTUCHO EPSON T133120-AL NEGRO', precio: 8479.00, codigoDeBarra: '0001034387692', idCategoria: 9, stock: 836, fechaAlta: '2017-01-25', activo: true },
        { id: 83, nombre: 'CARTUCHO EPSON T133420-AL AMARILLO', precio: 9690.00, codigoDeBarra: '0001034387696', idCategoria: 9, stock: 796, fechaAlta: '2016-12-28', activo: true },
        { id: 84, nombre: 'CARTUCHO HP 122 NEGRO', precio: 149.00, codigoDeBarra: '0088496298354', idCategoria: 9, stock: 373, fechaAlta: '2017-02-05', activo: true },
        { id: 85, nombre: 'CARTUCHO HP 22 COLOR', precio: 299.00, codigoDeBarra: '0082916090222', idCategoria: 9, stock: 199, fechaAlta: '2017-01-01', activo: true },
        { id: 86, nombre: 'CARTUCHO HP 60 COLOR', precio: 289.00, codigoDeBarra: '0088358598319', idCategoria: 9, stock: 801, fechaAlta: '2017-01-31', activo: true },
        { id: 87, nombre: 'CARTUCHO HP 60 NEGRO', precio: 199.00, codigoDeBarra: '0088358598317', idCategoria: 9, stock: 655, fechaAlta: '2017-01-08', activo: true },
        { id: 88, nombre: 'PC ALL IN ONE 120-1156LA + TECLADO INAL + MOUSE', precio: 5499.00, codigoDeBarra: '0088611278012', idCategoria: 9, stock: 331, fechaAlta: '2017-01-19', activo: true },
        { id: 90, nombre: 'IMPRESORA MULTIFUNCION EPSON L355', precio: 3999.00, codigoDeBarra: '0001034390469', idCategoria: 9, stock: 293, fechaAlta: '2017-01-01', activo: true },
        { id: 91, nombre: 'MULTIFUNCION EPSON L210 + SISTEMA CONTINUO', precio: 3399.00, codigoDeBarra: '0001034390433', idCategoria: 9, stock: 689, fechaAlta: '2017-01-09', activo: true },
        { id: 92, nombre: 'MULTIFUNCION EPSON XP211', precio: 1199.00, codigoDeBarra: '0001034390754', idCategoria: 9, stock: 693, fechaAlta: '2017-01-08', activo: true },
        { id: 93, nombre: 'MULTIFUNCION EPSON XP401', precio: 1799.00, codigoDeBarra: '0001034390348', idCategoria: 9, stock: 363, fechaAlta: '2017-01-17', activo: true },
        { id: 94, nombre: 'NOTEBOOK BGH C-530 3D', precio: 4999.00, codigoDeBarra: '0779816664067', idCategoria: 9, stock: 401, fechaAlta: '2017-01-30', activo: true },
        { id: 95, nombre: 'NOTEBOOK BGH C-550', precio: 5799.00, codigoDeBarra: '0779816664065', idCategoria: 9, stock: 230, fechaAlta: '2017-01-04', activo: true },
        { id: 96, nombre: 'NOTEBOOK BGH C-565', precio: 6299.00, codigoDeBarra: '0779816664069', idCategoria: 9, stock: 876, fechaAlta: '2017-02-06', activo: true },
        { id: 97, nombre: 'NOTEBOOK BGH C-570', precio: 7299.00, codigoDeBarra: '0779816664070', idCategoria: 9, stock: 929, fechaAlta: '2017-01-17', activo: true },
        { id: 98, nombre: 'NOTEBOOK BGH QL 300 MINI', precio: 3699.00, codigoDeBarra: '0779816664101', idCategoria: 9, stock: 176, fechaAlta: '2017-01-28', activo: true },
        { id: 99, nombre: 'NOTEBOOK DELL INSPIRON 14 3421 I14I32_45', precio: 6599.00, codigoDeBarra: '0789948950198', idCategoria: 9, stock: 758, fechaAlta: '2016-12-31', activo: true },
        { id: 100, nombre: 'NOTEBOOK DELL INSPIRON 14 3421 I14V997_4', precio: 5999.00, codigoDeBarra: '0779801657005', idCategoria: 9, stock: 666, fechaAlta: '2016-12-20', activo: true },
        { id: 101, nombre: 'NOTEBOOK LENOVO G485 C-70', precio: 4399.00, codigoDeBarra: '0088761972842', idCategoria: 9, stock: 115, fechaAlta: '2017-01-21', activo: true },
        { id: 102, nombre: 'NOTEBOOK NOBLEX CEVEN GFAST', precio: 4499.00, codigoDeBarra: '0779808041201', idCategoria: 9, stock: 853, fechaAlta: '2017-02-07', activo: true },
        { id: 103, nombre: 'NOTEBOOK POSITIVO BGH F-810N NEGRA', precio: 4999.00, codigoDeBarra: '0779816664059', idCategoria: 9, stock: 48, fechaAlta: '2017-01-21', activo: true },
        { id: 104, nombre: 'NOTEBOOK SAMSUNG NP300E4C', precio: 6999.00, codigoDeBarra: '0880608528173', idCategoria: 9, stock: 272, fechaAlta: '2017-01-08', activo: true },
        { id: 105, nombre: 'NOTEBOOK SAMSUNG NP300E5A AD4AR', precio: 4799.00, codigoDeBarra: '0880608500428', idCategoria: 9, stock: 194, fechaAlta: '2017-01-18', activo: true },
        { id: 106, nombre: 'ULTRABOOK ACER S3-391-6867', precio: 9793.00, codigoDeBarra: '0471219655495', idCategoria: 9, stock: 974, fechaAlta: '2017-01-23', activo: true },
        { id: 107, nombre: 'ADAPTADOR PCI WIFI TL-WN751ND', precio: 259.00, codigoDeBarra: '0693536405056', idCategoria: 9, stock: 171, fechaAlta: '2017-01-15', activo: false },
        { id: 110, nombre: 'ANTENA TP-LINK TL-ANT2408C', precio: 249.00, codigoDeBarra: '0693536405216', idCategoria: 9, stock: 689, fechaAlta: '2016-12-26', activo: true },
        { id: 111, nombre: 'MINI ADAPATADOR USB TP LINK WN723N', precio: 185.00, codigoDeBarra: '0693536405055', idCategoria: 9, stock: 382, fechaAlta: '2016-12-31', activo: true },
        { id: 112, nombre: 'ROUTER MR3420 3G TP-LINK', precio: 649.00, codigoDeBarra: '0693536405149', idCategoria: 9, stock: 143, fechaAlta: '2016-12-21', activo: true },
        { id: 113, nombre: 'ROUTER PORTATIL TP LINK TL-MR3020', precio: 499.00, codigoDeBarra: '0693536405170', idCategoria: 9, stock: 594, fechaAlta: '2017-02-01', activo: true },
        { id: 114, nombre: 'ROUTER TL-WR941ND TP LINK', precio: 759.00, codigoDeBarra: '0693536405127', idCategoria: 9, stock: 646, fechaAlta: '2017-02-06', activo: true },
        { id: 115, nombre: 'ROUTER TP-LINK TL-WR720N', precio: 309.00, codigoDeBarra: '0693536405198', idCategoria: 9, stock: 867, fechaAlta: '2017-01-01', activo: true },
        { id: 116, nombre: 'ROUTER WR740 TP-LINK', precio: 389.00, codigoDeBarra: '0693536405133', idCategoria: 9, stock: 925, fechaAlta: '2017-01-28', activo: true },
        { id: 117, nombre: 'ROUTER WR841 TP-LINK', precio: 469.00, codigoDeBarra: '0693536405124', idCategoria: 9, stock: 624, fechaAlta: '2017-01-29', activo: true },
        { id: 118, nombre: 'TABLET MAGNUM TECH 7"', precio: 2599.00, codigoDeBarra: '0779813546539', idCategoria: 9, stock: 344, fechaAlta: '2016-12-26', activo: true },
        { id: 119, nombre: 'TABLET 10" MAGNUM TECH 8GB 1GBM', precio: 3799.00, codigoDeBarra: '0779813546540', idCategoria: 9, stock: 751, fechaAlta: '2017-01-24', activo: true },
        { id: 120, nombre: 'TABLET 10" NOBLEX NB1012', precio: 3549.00, codigoDeBarra: '0779696292015', idCategoria: 9, stock: 319, fechaAlta: '2017-01-13', activo: true },
        { id: 121, nombre: 'TABLET ALCATEL AB10', precio: 1799.00, codigoDeBarra: '0695508989953', idCategoria: 9, stock: 939, fechaAlta: '2017-02-01', activo: true },
        { id: 122, nombre: 'TABLET EUROCASE ARS 708', precio: 1099.00, codigoDeBarra: '0779813546928', idCategoria: 9, stock: 534, fechaAlta: '2017-01-26', activo: true },
        { id: 123, nombre: 'TABLET FUNTAB PRO', precio: 1699.00, codigoDeBarra: '0081770701101', idCategoria: 9, stock: 869, fechaAlta: '2017-01-23', activo: true },
        { id: 124, nombre: 'TABLET IDEAPAD LENOVO A1000L', precio: 2799.00, codigoDeBarra: '0088794260611', idCategoria: 9, stock: 597, fechaAlta: '2017-01-05', activo: true },
        { id: 125, nombre: 'TABLET LENOVO IDEAPAD A1000 7"', precio: 2299.00, codigoDeBarra: '0088777046041', idCategoria: 9, stock: 510, fechaAlta: '2017-02-04', activo: true },
        { id: 126, nombre: 'TABLET MAGNUM MG-701', precio: 1499.00, codigoDeBarra: '0779813546946', idCategoria: 9, stock: 645, fechaAlta: '2017-02-05', activo: true },
        { id: 127, nombre: 'TABLET NOBLEX-8013 8\'', precio: 2149.00, codigoDeBarra: '0779696291801', idCategoria: 9, stock: 850, fechaAlta: '2017-01-17', activo: true },
        { id: 130, nombre: 'TABLET OLIPAD SMART 7" 3G', precio: 1499.00, codigoDeBarra: '0802033432056', idCategoria: 9, stock: 489, fechaAlta: '2017-02-07', activo: true },
        { id: 131, nombre: 'TABLET PC 7001 TITAN', precio: 999.00, codigoDeBarra: '0076113310158', idCategoria: 9, stock: 850, fechaAlta: '2016-12-24', activo: true },
        { id: 132, nombre: 'TABLET PC BOX T700U 7" DUAL CORE', precio: 1999.00, codigoDeBarra: '0779815876409', idCategoria: 9, stock: 769, fechaAlta: '2017-02-06', activo: true },
        { id: 133, nombre: 'TABLET PC FIRSTAR MID070A 8650', precio: 799.00, codigoDeBarra: '0779815467080', idCategoria: 9, stock: 9, fechaAlta: '2017-01-23', activo: true },
        { id: 134, nombre: 'TABLET PCBOX MOD T900', precio: 2799.00, codigoDeBarra: '0779815876410', idCategoria: 9, stock: 501, fechaAlta: '2017-01-25', activo: true },
        { id: 135, nombre: 'TABLET POLAROID MID1000 10', precio: 4299.00, codigoDeBarra: '0358417655560', idCategoria: 9, stock: 151, fechaAlta: '2016-12-23', activo: true },
        { id: 136, nombre: 'TABLET SYNKOM 7"', precio: 2499.00, codigoDeBarra: '0779816920041', idCategoria: 9, stock: 695, fechaAlta: '2016-12-23', activo: true },
        { id: 137, nombre: 'TABLET XVIEW ALPHA2 8GB', precio: 1899.00, codigoDeBarra: '0779804220264', idCategoria: 9, stock: 565, fechaAlta: '2017-02-05', activo: true },
        { id: 138, nombre: 'TABLET XVIEW PROTON', precio: 1699.00, codigoDeBarra: '0779804220247', idCategoria: 9, stock: 3, fechaAlta: '2016-12-28', activo: true },
        { id: 139, nombre: 'AIRE ACONDICIONADO DAEWOO 3200FC DWT23200FC', precio: 5898.00, codigoDeBarra: '0779816944014', idCategoria: 7, stock: 668, fechaAlta: '2018-01-04', activo: true },
        { id: 140, nombre: 'AIRE ACONDICIONADO DURABRAND 3500FC DUS35WCL4', precio: 5499.00, codigoDeBarra: '0779688543933', idCategoria: 7, stock: 945, fechaAlta: '2017-01-20', activo: true },
        { id: 141, nombre: 'AIRE ACONDICIONADO DURABRAND 4500FC DUS53WCL4', precio: 7499.00, codigoDeBarra: '0779688543937', idCategoria: 7, stock: 962, fechaAlta: '2016-12-29', activo: true },
        { id: 142, nombre: 'AIRE ACONDICIONADO KELVINATOR 2500WFC COD1056', precio: 4499.00, codigoDeBarra: '0779694101056', idCategoria: 7, stock: 670, fechaAlta: '2017-01-03', activo: true },
        { id: 143, nombre: 'AIRE ACONDICIONADO LG 3000 FC H126TNW0', precio: 7499.00, codigoDeBarra: '0779808338858', idCategoria: 7, stock: 441, fechaAlta: '2017-01-09', activo: true },
        { id: 144, nombre: 'AIRE ACONDICIONADO LG 4500 FC H1865NW0', precio: 10399.00, codigoDeBarra: '0779808338859', idCategoria: 7, stock: 971, fechaAlta: '2016-12-23', activo: true },
        { id: 145, nombre: 'AIRE ACONDICIONADO LG 5500 FC H2465NW0', precio: 12699.00, codigoDeBarra: '0779808338860', idCategoria: 7, stock: 648, fechaAlta: '2017-01-15', activo: true },
        { id: 146, nombre: 'AIRE ACONDICIONADO LG ARTCOOL 2300FC H096EFT0', precio: 7999.00, codigoDeBarra: '0779808338853', idCategoria: 7, stock: 659, fechaAlta: '2017-01-01', activo: true },
        { id: 147, nombre: 'AIRE ACONDICIONADO LG ARTCOOL 4500FC H1868FT0', precio: 12899.00, codigoDeBarra: '0779808338855', idCategoria: 7, stock: 712, fechaAlta: '2016-12-25', activo: true },
        { id: 148, nombre: 'AIRE ACONDICIONADO PHILCO 3200W FC PHS32H13X', precio: 6199.00, codigoDeBarra: '0779696244974', idCategoria: 7, stock: 588, fechaAlta: '2017-01-09', activo: true },
        { id: 149, nombre: 'AIRE ACONDICIONADO PHILCO 5000W FC PHS50H13X', precio: 9099.00, codigoDeBarra: '0779696242975', idCategoria: 7, stock: 275, fechaAlta: '2016-12-22', activo: true },
        { id: 150, nombre: 'AIRE ACONDICIONADO PORTATIL DURABRAND 2500FS LGACD01', precio: 4999.00, codigoDeBarra: '0073621119267', idCategoria: 7, stock: 995, fechaAlta: '2017-01-26', activo: true },
        { id: 151, nombre: 'AIRE ACONDICIONADO SAMSUNG 3000FC AR12FQFTAUR', precio: 7949.00, codigoDeBarra: '0880608575497', idCategoria: 7, stock: 34, fechaAlta: '2017-01-03', activo: true },
        { id: 152, nombre: 'AIRE ACONDICIONADO SANYO 2600W FC KC913HSAN', precio: 6099.00, codigoDeBarra: '0779696244956', idCategoria: 7, stock: 372, fechaAlta: '2017-01-23', activo: true },
        { id: 153, nombre: 'AIRE ACONDICIONADO SANYO 3200W FC KC1213HSAN', precio: 6899.00, codigoDeBarra: '0779696242957', idCategoria: 7, stock: 260, fechaAlta: '2017-02-02', activo: true },
        { id: 154, nombre: 'AIRE ACONDICIONADO SURREYPRIA 2250FC 553EPQ0913F', precio: 6929.00, codigoDeBarra: '0779708708630', idCategoria: 7, stock: 38, fechaAlta: '2016-12-30', activo: true },
        { id: 155, nombre: 'AIRE ACONDICIONADO SURREYPRIA 3000FC 553EPQ1213F', precio: 7949.00, codigoDeBarra: '0779708708631', idCategoria: 7, stock: 180, fechaAlta: '2017-01-04', activo: true },
        { id: 156, nombre: 'AIRE ACONDICIONADO SURREYPRIA 4500FC 553EPQ1813F', precio: 11849.00, codigoDeBarra: '0779708708632', idCategoria: 7, stock: 232, fechaAlta: '2017-01-07', activo: true },
        { id: 157, nombre: 'AIRE ACONDICIONADO SURREYPRIA 5500FC 553EPQ2213F', precio: 14329.00, codigoDeBarra: '0779708708633', idCategoria: 7, stock: 909, fechaAlta: '2017-01-10', activo: true },
        { id: 158, nombre: 'CALEFACTOR SIN SALIDA 4000 KCAL VOLCAN', precio: 1159.00, codigoDeBarra: '0779703781219', idCategoria: 7, stock: 598, fechaAlta: '2016-12-23', activo: true },
        { id: 159, nombre: 'CALEFACTOR SIN SALIDA ORBIS 4200 KCAL', precio: 1469.00, codigoDeBarra: '0779703781123', idCategoria: 7, stock: 504, fechaAlta: '2017-01-11', activo: false },
        { id: 160, nombre: 'ESTUFA ORBIS TIRO BALANCEADO 5000 K', precio: 2019.00, codigoDeBarra: '0779703781129', idCategoria: 7, stock: 600, fechaAlta: '2017-01-17', activo: true },
        { id: 161, nombre: 'ESTUFA VOLCAN TIRO BALANCEADO 2000 KCAL 42312V', precio: 1439.00, codigoDeBarra: '0779703781220', idCategoria: 7, stock: 602, fechaAlta: '2016-12-28', activo: true },
        { id: 162, nombre: 'ESTUFA VOLCAN TIRO BALANCEADO NEGRO 3800 43712V', precio: 1679.00, codigoDeBarra: '0779703781221', idCategoria: 7, stock: 650, fechaAlta: '2017-02-04', activo: true },
        { id: 163, nombre: 'TIRO BALANCEADO 3500 KCAL EMEGE', precio: 1605.00, codigoDeBarra: '0779135400180', idCategoria: 7, stock: 474, fechaAlta: '2017-01-29', activo: true },
        { id: 164, nombre: 'CALEFACTOR ELECTRICO CLEVER VIDRIO H1107', precio: 1950.00, codigoDeBarra: '0779815957117', idCategoria: 7, stock: 459, fechaAlta: '2016-12-29', activo: true },
        { id: 165, nombre: 'CALEFACTOR ELECTRICO CONVECCION CON-1800', precio: 1599.00, codigoDeBarra: '0779814958212', idCategoria: 7, stock: 10, fechaAlta: '2017-01-13', activo: true },
        { id: 166, nombre: 'CALEFACTOR ELECTRICO CONVECCION CON-2000N', precio: 790.00, codigoDeBarra: '0779815957180', idCategoria: 7, stock: 112, fechaAlta: '2017-01-11', activo: true },
        { id: 167, nombre: 'CALEFACTOR ELECTRICO CONVECCION CON-2000R', precio: 790.00, codigoDeBarra: '0779815957181', idCategoria: 7, stock: 141, fechaAlta: '2017-01-26', activo: true },
        { id: 168, nombre: 'CALEFACTOR LILIANA INFRARROJO CI062', precio: 345.00, codigoDeBarra: '0779386200687', idCategoria: 7, stock: 516, fechaAlta: '2016-12-27', activo: true },
        { id: 169, nombre: 'CALEFACTOR PANEL 500 WATTS', precio: 769.00, codigoDeBarra: '0779813482002', idCategoria: 7, stock: 804, fechaAlta: '2017-01-03', activo: true },
        { id: 170, nombre: 'CALOVENTOR 2000 W AXEL AX-CA100', precio: 249.00, codigoDeBarra: '0779811896139', idCategoria: 7, stock: 780, fechaAlta: '2017-01-10', activo: true },
        { id: 171, nombre: 'CALOVENTOR DE PARED 2000 W KENBROWN', precio: 839.00, codigoDeBarra: '0779811320136', idCategoria: 7, stock: 737, fechaAlta: '2016-12-28', activo: true },
        { id: 172, nombre: 'CALOVENTOR DE PARED PROTALIA CP200A', precio: 799.00, codigoDeBarra: '0779811559131', idCategoria: 7, stock: 833, fechaAlta: '2017-01-30', activo: true },
        { id: 173, nombre: 'CALOVENTOR ELECTRICO BLANCO 1500W LE1500B', precio: 599.00, codigoDeBarra: '0779815957245', idCategoria: 7, stock: 492, fechaAlta: '2017-01-04', activo: true },
        { id: 174, nombre: 'CALOVENTOR ELECTRICO LE1500ROJO', precio: 599.00, codigoDeBarra: '0779815957247', idCategoria: 7, stock: 437, fechaAlta: '2017-01-29', activo: true },
        { id: 175, nombre: 'CALOVENTOR ELECTRICO NEGRO 1500W LE1500N', precio: 599.00, codigoDeBarra: '0779815957246', idCategoria: 7, stock: 875, fechaAlta: '2017-01-09', activo: true },
        { id: 176, nombre: 'CALOVENTOR ELECTROLUX SPLIT CONTROL REMOTO', precio: 999.00, codigoDeBarra: '0779386200613', idCategoria: 7, stock: 675, fechaAlta: '2016-12-20', activo: true },
        { id: 177, nombre: 'CALOVENTOR KEN BROWN 2000 W', precio: 319.00, codigoDeBarra: '0779811320075', idCategoria: 7, stock: 76, fechaAlta: '2017-01-23', activo: true },
        { id: 178, nombre: 'CALOVENTOR RESISTENCIA CERAMICA', precio: 319.00, codigoDeBarra: '0557306319076', idCategoria: 7, stock: 243, fechaAlta: '2017-01-08', activo: true },
        { id: 179, nombre: 'CIRCULADOR DE AIRE FRIO CALOR DURABRAND', precio: 1049.00, codigoDeBarra: '0073621119287', idCategoria: 7, stock: 121, fechaAlta: '2017-01-30', activo: true },
        { id: 180, nombre: 'CONVECTOR AXEL 2000 W AX-COT100', precio: 689.00, codigoDeBarra: '0779811896141', idCategoria: 7, stock: 357, fechaAlta: '2016-12-24', activo: true },
        { id: 181, nombre: 'CONVECTOR AXEL 2000 W CON TURBO AX-COT', precio: 609.00, codigoDeBarra: '0779811896131', idCategoria: 7, stock: 246, fechaAlta: '2017-01-16', activo: true },
        { id: 182, nombre: 'CONVECTOR CLEVER CLEVERBLANCO CON2000B', precio: 790.00, codigoDeBarra: '0779815957179', idCategoria: 7, stock: 229, fechaAlta: '2017-01-09', activo: true },
        { id: 183, nombre: 'CONVECTOR TELEFUNKEN 2000 WATT C1009', precio: 479.00, codigoDeBarra: '0779724533114', idCategoria: 7, stock: 642, fechaAlta: '2016-12-29', activo: true },
        { id: 184, nombre: 'ESTUFA ELECTROLUX HALOGENAS HAL18G', precio: 549.00, codigoDeBarra: '0779386200254', idCategoria: 7, stock: 295, fechaAlta: '2017-01-15', activo: true },
        { id: 185, nombre: 'ESTUFA ELECTRICA KEN BROWN 2 VELAS 800 KB 22', precio: 245.00, codigoDeBarra: '0779811320288', idCategoria: 7, stock: 598, fechaAlta: '2016-12-24', activo: true },
        { id: 186, nombre: 'ESTUFA HALOGENA 3 VELAS KEN BROWN', precio: 409.00, codigoDeBarra: '0779811320134', idCategoria: 7, stock: 580, fechaAlta: '2016-12-24', activo: true },
        { id: 187, nombre: 'ESTUFA HALOGENA 4 VELAS KEN BROWN', precio: 449.00, codigoDeBarra: '0779811320135', idCategoria: 7, stock: 741, fechaAlta: '2017-01-28', activo: true },
        { id: 188, nombre: 'ESTUFA HALOGENA ELECTROLUX 1600W SIN OSCILACION HAL18A', precio: 499.00, codigoDeBarra: '0779386200253', idCategoria: 7, stock: 632, fechaAlta: '2016-12-23', activo: true },
        { id: 189, nombre: 'ESTUFA HALOGENA MAGIC 1200 W C1007', precio: 189.00, codigoDeBarra: '0779724533112', idCategoria: 7, stock: 518, fechaAlta: '2016-12-26', activo: true },
        { id: 190, nombre: 'PANEL 1000W ATMA', precio: 99999.00, codigoDeBarra: '0779696280631', idCategoria: 7, stock: 951, fechaAlta: '2017-01-17', activo: true },
        { id: 191, nombre: 'PANEL 2000 W NEGRO ENERGY SAVE', precio: 1499.00, codigoDeBarra: '0779814951036', idCategoria: 7, stock: 647, fechaAlta: '2016-12-20', activo: true },
        { id: 192, nombre: 'PANEL 500 W ECOSOL', precio: 1119.00, codigoDeBarra: '0779813482029', idCategoria: 7, stock: 805, fechaAlta: '2017-01-18', activo: true },
        { id: 193, nombre: 'PANEL 900W ECOSOL 1-502', precio: 1869.00, codigoDeBarra: '0779813482031', idCategoria: 7, stock: 726, fechaAlta: '2017-02-01', activo: true },
        { id: 194, nombre: 'PANEL MICA ELECTROLUX RMIC15', precio: 999.00, codigoDeBarra: '0779386200256', idCategoria: 7, stock: 331, fechaAlta: '2016-12-26', activo: true },
        { id: 195, nombre: 'PANEL PIETRA 500 W PEISA', precio: 699.00, codigoDeBarra: '0779808116284', idCategoria: 7, stock: 171, fechaAlta: '2017-01-27', activo: true },
        { id: 196, nombre: 'RADIADOR DE MICA ELECTROLUX 1000W RALU01', precio: 699.00, codigoDeBarra: '0779817317015', idCategoria: 7, stock: 987, fechaAlta: '2017-01-24', activo: true },
        { id: 197, nombre: 'TURBO CALENTADOR 2000W TCAL2000', precio: 590.00, codigoDeBarra: '0779815957248', idCategoria: 7, stock: 539, fechaAlta: '2017-01-03', activo: true },
        { id: 198, nombre: 'VENTILADOR DE PIE DURABRAND 18" VP21', precio: 122.00, codigoDeBarra: '0779797170650', idCategoria: 7, stock: 318, fechaAlta: '2017-01-31', activo: true },
        { id: 199, nombre: 'CAMARA DIGITAL C1433 SLVER GE', precio: 899.00, codigoDeBarra: '0084695100018', idCategoria: 6, stock: 528, fechaAlta: '2017-02-02', activo: true },
        { id: 200, nombre: 'LIMPIADOR CD SV 8336 ONE FOR ALL', precio: 55.00, codigoDeBarra: '0871618404342', idCategoria: 1, stock: 508, fechaAlta: '2016-12-27', activo: true },
        { id: 201, nombre: 'LIMPIADOR LCD SV 8410 ONE FOR ALL', precio: 102.00, codigoDeBarra: '0871618404333', idCategoria: 1, stock: 186, fechaAlta: '2017-02-02', activo: true },
    ]);
}

if (__filename === process.argv[1]) {
    inicializarBase();
}

export default inicializarBase;