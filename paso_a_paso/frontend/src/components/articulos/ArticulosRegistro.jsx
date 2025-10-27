import React from "react";
import { useForm } from "react-hook-form";

export default function ArticulosRegistro({ AccionABMC, Categorias, Item, Grabar, Volver }) {
    if (!Item)
        return null;
    const { register, handleSubmit, formState: { errors, touchedFields, isValid, isSubmitted }, } = useForm({ values: Item });
    const onSubmit = (data) => {
        Grabar(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}> {/* no podria poner Grabar directamente en vez de onSubmit?*/}
            <div className="container-fluid">
                <fieldset disabled={AccionABMC === "C"}>
                    {/* campo nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="nombre">
                                Nombre<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("nombre", {
                                    required: { value: true, message: "Nombre es requerido" },
                                    minLength: {
                                        value: 4,
                                        message: "Nombre debe tener al menos 4 caracteres",
                                    },
                                    maxLength: {
                                        value: 55,
                                        message: "Nombre debe tener como máximo 55 caracteres",
                                    },
                                })}
                                autoFocus
                                className={"form-control " + (errors?.nombre ? "is-invalid" : "")}
                            />
                            {errors?.nombre && touchedFields.nombre && (
                                <div className="invalid-feedback">
                                    {errors?.nombre?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo Precio */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Precio">
                                Precio<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number"
                                step=".01"
                                {...register("precio", {
                                    required: { value: true, message: "Precio es requerido" },
                                    min: {
                                        value: 0.01,
                                        message: "Precio debe ser mayor a 0",
                                    },
                                    max: {
                                        value: 99999.99,
                                        message: "Precio debe ser menor o igual a 99999.99",
                                    },
                                })}
                                className={"form-control" + (errors?.precio ? " is-invalid" : "")}
                            />
                            <div className="invalid-feedback">{errors?.precio?.message}</div>
                        </div>
                    </div>

                    {/* campo Stock */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Stock">
                                Stock<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number"
                                {...register("stock", {
                                    required: { value: true, message: "Stock es requerido" },
                                    min: {
                                        value: 0,
                                        message: "Stock debe ser mayor a 0",
                                    },
                                    max: {
                                        value: 99999,
                                        message: "Stock debe ser menor o igual a 999999",
                                    },
                                })}
                                className={"form-control" + (errors?.stock ? " is-invalid" : "")}
                            />
                            <div className="invalid-feedback">{errors?.stock?.message}</div>
                        </div>
                    </div>

                    {/* campo CodigoDeBarra */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="CodigoDeBarra">
                                Codigo De Barra<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("codigoDeBarra", {
                                    required: {
                                        value: true,
                                        message: "Codigo De Barra es requerido",
                                    },
                                    pattern: {
                                        value: /^[0-9]{13}$/,
                                        message:
                                            "Codigo De Barra debe ser un número, de 13 dígitos",
                                    },
                                })}
                                className={"form-control" + (errors?.codigoDeBarra ? " is-invalid" : "")}
                            />
                            <div className="invalid-feedback">
                                {errors?.codigoDeBarra?.message}
                            </div>

                        </div>
                    </div>

                    {/* campo idCategoria*/}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="idCategoria">
                                Categoria<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                className={"form-select" + (errors?.idCategoria ? " is-invalid" : "")}
                                {...register("idCategoria", {
                                    required: { value: true, message: "Categoria es requerido" },
                                })}
                            >
                                <option defaultValue="" key={1}></option>
                                {Categorias?.map((x) => (
                                    <option value={x.idCategoria} key={x.idCategoria}>
                                        {x.nombre}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.idCategoria?.message}
                            </div>
                        </div>
                    </div>

                    {/* campo FechaAlta */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="FechaAlta">
                                Fecha Alta<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register("fechaAlta", {
                                    required: { value: true, message: "Fecha Alta es requerido" }
                                })}
                                className={"form-control" + (errors?.fechaAlta ? " is-invalid" : "")}
                            />
                            <div className="invalid-feedback">
                                {errors?.fechaAlta?.message}
                            </div>
                        </div>
                    </div>

                    {/* campo Activo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Activo">
                                Activo<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("activo")}
                                className="form-control"
                                disabled
                            >
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>
                        </div>
                    </div>

                </fieldset>

                {/* Botones Grabar, Cancelar/Volver' */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => Volver()}
                        >
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? " Volver" : " Cancelar"}
                        </button>
                    </div>
                </div>

                {/* texto: Revisar los datos ingresados... */}
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}
            </div>
        </form>
    );
}
