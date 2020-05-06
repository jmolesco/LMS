const DB = require('@Library/repository');
const categoryCriteria = require('@Library/DB/category/criteria');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');

module.exports = {
  MapCategoryList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
  }) => {
    const repository = DB();

    const criteria = categoryCriteria();

    if (filterStatus) {
      if (filterStatus.status === 1) {
        criteria.statusEqual(true);
      } else if (filterStatus.status === 2) {
        criteria.statusEqual(false);
      }
    }
    if (searchKeyword) {
      criteria.keywordLike(searchKeyword.keyword);
    }
    if (orderBy) {
      if (orderBy.orderKey === 1) { // ID
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByID(SortType.ASC);
        } else {
          criteria.orderByID(SortType.DESC);
        }
      } else if (orderBy.orderType === SortType.ASC) { // ASC
        criteria.orderByCategory(SortType.ASC);
      } else {
        criteria.orderByCategory(SortType.DESC);
      }
    } else {
      criteria.orderByIntime();
    }

    const page = {
      page: pager.page,
      maxRecord: (config.ADMINMAXRECORDCOUNT_MISCELLANEOUS * pager.page),
    };
    const CategoryCount = await repository.CategoryRepository.getCategoryListCount(criteria);
    criteria.setPager(page);
 
    const result = await repository.CategoryRepository.getCategoryList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, CategoryCount, page);
  },
  MapCategoryDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.CategoryRepository.getCategoryDetail(id);
    return repository.MapGetDataList(result);
  },
};
