export function constructFilterQuery({ category, priceLimit }) {
  const filterQuery = {};
  if (category) {
    switch (category) {
      case "women fashion": {
        filterQuery.category = "women fashion";
        break;
      }
      case "men fashion": {
        filterQuery.category = "men fashion";
        break;
      }
      case "electronics": {
        filterQuery.category = "electronics";
        break;
      }
      case "shoes": {
        filterQuery.tags = "shoes";
        break;
      }
      case "phones": {
        filterQuery.tags = "phone";
        break;
      }
      case "laptops": {
        filterQuery.tags = "laptop";
        break;
      }
      case "watches": {
        filterQuery.tags = "watch";
        break;
      }
      case "camera": {
        filterQuery.tags = "camera";
        break;
      }
      case "headphones": {
        filterQuery.tags = { $in: ["headphones", "earphones"] };
        break;
      }
      case "flash sales": {
        filterQuery.discount = { $gt: 0 };
        break;
      }
      case "best selling": {
        filterQuery.reviewsCount = { $gt: 50 };
        break;
      }
    }
  }

  // add price limit to filter query
  if (priceLimit) {
    filterQuery.price = { $lte: Number(priceLimit) };
  }

  return filterQuery;
}

export function constructSortQuery(sort) {
  const sortQuery = {};
  if (sort) {
    switch (sort) {
      case "name ascending": {
        sortQuery.name = 1;
        break;
      }
      case "name descending": {
        sortQuery.name = -1;
        break;
      }
      case "price ascending": {
        sortQuery.price = 1;
        break;
      }
      case "price descending": {
        sortQuery.price = -1;
        break;
      }
    }
  }

  return sortQuery;
}
