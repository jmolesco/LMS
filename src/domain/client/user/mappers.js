// eslint-disable-next-line import/no-extraneous-dependencies
const DB = require('@Library/repository');
// eslint-disable-next-line import/no-extraneous-dependencies
const userCriteria = require('@Library/DB/user/criteria');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');


module.exports = {
  MapUserList: async ({ pager }) => {
    const repository = DB();

    const criteria = userCriteria();
    criteria.statusEqual(true);

    const page = {
      page: pager.page,
      maxRecord: (config.ADMINMAXRECORDCOUNT_MISCELLANEOUS * pager.page),
    };
    const UserCount = await repository.UserRepository.getUserListCount(criteria);
    criteria.setPager(page);
    criteria.orderByIntime();
    const result = await repository.UserRepository.getUserList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, UserCount, page);
  },
  MapUserDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.UserRepository.getUserDetail(id);
    return repository.MapGetDataList(result);
  },
};
