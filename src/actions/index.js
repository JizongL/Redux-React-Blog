import jsonPlaceholder from '../apis/jsoPlaceholder';
import _ from 'lodash';
export const fetchPostsAndUsers = () => async (dispatch, getState) =>{
    
    await dispatch(fetchPosts());
    // const userIds = _.uniq(_.map(getState().posts, 'userId'))
    // userIds.forEach( id => dispatch(fetchUser(id)))
    // use lodash _.chain to chain the above function blocks into a chained function. 
    _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id=> dispatch(fetchUser(id)))
    .value()
};
 
export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
    
        dispatch({type:'FETCH_POSTS',payload:response.data})
    };     

// export const fetchUser = (id)=>  dispatch => _fetchUser(id, dispatch)
// const _fetchUser = _.memoize(async (id, dispatch)=>{
//         const response = await jsonPlaceholder.get(`users/${id}`);
//         dispatch({type:'FETCH_USER', payload:response.data})
// })

export const fetchUser = (id)=>  async dispatch =>{
        const response = await jsonPlaceholder.get(`users/${id}`);
        dispatch({type:'FETCH_USER', payload:response.data});
};
