"use strict";

//SEARCHING & SORTING & PAGINATION

module.exports = (req, res, next) => {
  // ----------------------------------------------
  //SEARCHING  URL?search[title]=value1&search[title]=value2
  const search = req.query?.search ?? {};

  for (let key in search) search[key] = { $regex: search[key], $options: "i" };

  // ----------------------------------------------
  //SORTING
  const sort = req.query?.sort ?? {};
  // ----------------------------------------------
  // PAGINATION // URL?page=1&limit10
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env.PAGESIZE ?? 20);
  let page = Number(req.query?.page ?? 1);
  page = (page > 0 ? page : 1) - 1;
  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : page * limit;

  //RUN
  res.getModelList = async (Model, filters = {}, populate = null) => {
    const searchAndFilters = { ...filters, ...search };

    return await Model.find(searchAndFilters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  // Details:
  res.getModelListDetails = async (Model, filters = {}) => {
    const searchAndFilters = { ...filters, ...search };
    const data = await Model.find(searchAndFilters);
    let details = {
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };
  next();
};
