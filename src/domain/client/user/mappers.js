// eslint-disable-next-line import/no-extraneous-dependencies
const DB = require('@Library/repository');
// eslint-disable-next-line import/no-extraneous-dependencies
const userCriteria = require('@Library/DB/user/criteria');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');
// eslint-disable-next-line import/no-extraneous-dependencies
const { SortType } = require('@Library/constants');

module.exports = {
  MapUserList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
    filterRole,
  }) => {
    const repository = DB();

    const criteria = userCriteria();
    let newCriteria;

    if (filterStatus) {
      if (filterStatus.status === 1) {
        criteria.statusEqual(true);
      } else if (filterStatus.status === 2) {
        criteria.statusEqual(false);
      }
    }
    if (filterRole) {
      if (filterRole.role === 1) { // STUDENT
        criteria.roleEqual(filterRole.role);
      } else if (filterRole.role === 2) { // PARENT
        criteria.roleEqual(filterRole.role);
      } else if (filterRole.role === 3) { // ADMIN
        criteria.roleEqual(filterRole.role);
      }
    }
    if (searchKeyword.keyword) {
      const criterias = userCriteria();
      const criteria1 = userCriteria();
      const criteria2 = userCriteria();
      const criteria3 = userCriteria();
      criteria1.fullNameLike(searchKeyword.keyword);
      criteria2.emailLike(searchKeyword.keyword);
      criteria3.userNameLike(searchKeyword.keyword);
      const newCriterias = criterias.joinORCriteria([criteria1, criteria2, criteria3]);
      newCriteria = criteria.joinANDCriteria([newCriterias]);
    }
    let noOrderBy = false;
    if (orderBy) {
      if (orderBy.orderKey === 1) { // ID
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByID(SortType.ASC);
        } else if (orderBy.orderType === SortType.DESC) {
          criteria.orderByID(SortType.DESC);
        }
      } else if (orderBy.orderKey === 2) { // Name
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByFullName(SortType.ASC);
        } else if (orderBy.orderType === SortType.DESC) {
          criteria.orderByFullName(SortType.DESC);
        }
      } else if (orderBy.orderKey === 3) { // Email Address
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByEmail(SortType.ASC);
        } else if (orderBy.orderType === SortType.DESC) {
          criteria.orderByEmail(SortType.DESC);
        }
      } else if (orderBy.orderKey === 4) { // Username
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByUserName(SortType.ASC);
        } else if (orderBy.orderType === SortType.DESC) {
          criteria.orderByUserName(SortType.DESC);
        }
      } else {
        noOrderBy = true;
      }
    }

    const page = {
      page: pager.page,
      maxRecord: (config.ADMINMAXRECORDCOUNT_MISCELLANEOUS),
    };
    const UserCount = await repository.UserRepository.getUserListCount(newCriteria || criteria);
    criteria.setPager(page);

    const result = await repository.UserRepository.getUserList(newCriteria || criteria);
    if (noOrderBy === true) criteria.orderByIntime();

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, UserCount.id, page);
  },
  MapUserDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.UserRepository.getUserDetail(id);
    return repository.MapGetDataList(result);
  },
};
