import axios from "axios";
import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";

function App() {
    const [data, setdata] = useState([]);
    const [data1, setdata1] = useState([]);
    const [category, setcategory] = useState("all");
    const [searchproduct, setSearchProduct] = useState("");
    const [price, setprice] = useState("all");

    const [pagenumber, setpagenumber] = useState(0);

    const serverdata = () => {
        axios
            .get(`https://dummyjson.com/products`)
            .then((res) => {
                console.log(res);
                setdata(res.data.products);
                setdata1(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        serverdata();
    }, []);

    const pagePerProducts = 10;
    const visitedPage = pagenumber * pagePerProducts;
    const DisplayProduct = data ? data.slice(visitedPage, visitedPage + pagePerProducts) : [];
    const countPage = data ? Math.ceil(data.length / pagePerProducts) : 0;
    const changePage = ({ selected }) => {
        setpagenumber(selected);
    };

    useEffect(() => {
        // category data
        let dataFilter = data1;
        if (category !== "all") {
            dataFilter = dataFilter.filter((data) => data.category === category);
        }

        //redio btn
        if (price !== "all") {
            dataFilter = dataFilter.filter((data) => {
                if (price === "option4") {
                    return data1;
                } else if (price === "option1") {
                    return data.price >= 0 && data.price <= 100;
                } else if (price === "option2") {
                    return data.price >= 101 && data.price <= 200;
                } else if (price === "option3") {
                    return data.price >= 201 && data.price <= 4000;
                } else {
                    return true;
                }
            });
        }

        setdata(dataFilter);
    }, [category, data1, price]);

    const pricechange = (e) => {
        setprice(e.target.value);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-5">
                        <div className="input-group mb-3 border border-2 rounded">
                            <input
                                type="text"
                                className="form-control border-0"
                                value={searchproduct}
                                onChange={(e) => setSearchProduct(e.target.value)}
                                placeholder="Search here"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            ></input>
                            <span className="input-group-text border-0  bg-transparent " id="basic-addon2">
                                <i className=" text-dark  fa-solid fa-magnifying-glass fa-flip"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-5">
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setcategory(e.target.value);
                            }}
                        >
                            <option value="all">All</option>
                            <option value="beauty">beauty</option>
                            <option value="fragrances">fragrances</option>
                            <option value="furniture">furniture</option>
                            <option value="groceries">groceries</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={pricechange} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                            <label className="form-check-label" for="inlineRadio1">
                                $0 - $100
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" onChange={pricechange} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                            <label className="form-check-label" for="inlineRadio2">
                                $101 - $200
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" onChange={pricechange} name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                            <label className="form-check-label" for="inlineRadio3">
                                $201 - $4000
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" onChange={pricechange} name="inlineRadioOptions" id="inlineRadio4" value="option4" />
                            <label className="form-check-label" for="inlineRadio4">
                                Default
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" container">
                <div className="row">
                    <div className="col-12">
                        <table className="table border mt-4  table-hover table-bordered border-dark">
                            <thead className="col-12 table-dark">
                                <tr>
                                    <th className="col-1">ID</th>
                                    <th className="col-3">TITLE</th>
                                    <th className="col-1">PRICE</th>
                                    <th className="col-2">CATEGORY</th>
                                    <th className="col-2">REVIEWERNAME</th>
                                    <th className="col-2">REVIEWEREMAIL</th>
                                </tr>
                            </thead>
                            {(searchproduct === ""
                                ? DisplayProduct
                                : data.filter((item) => {
                                      if (item.title.toLowerCase().includes(searchproduct.toLowerCase())) {
                                          return item;
                                      } else {
                                          return null;
                                      }
                                  })
                            ).map((value, index) => {
                                return (
                                    <tbody key={index} className=" ">
                                        <tr className="">
                                            <th className="col-1">{value.id}</th>
                                            <td className="col-3">{value.title}</td>
                                            <td className="col-1">{value.price}</td>
                                            <td className="col-2">{value.category}</td>
                                            <td className="col-3">{value.reviews[0].reviewerName}</td>
                                            <td className="col-3">{value.reviews[0].reviewerEmail}</td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <ReactPaginate pageCount={countPage} onPageChange={changePage} className="paginationBttns mb-5  "></ReactPaginate>
            </div>
        </>
    );
}

export default App;
