import { API_URL } from "./../../common/utils";

export default (await import('vue')).defineComponent({
name: 'ListPostComponent',
components: {
PostComponent,
},
data() {
return {
publications: [],
isAdmin: false,
};
},
async created() {
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const user = await this.axios.get(`${API_URL}/user/${userId}`, {
headers: {
"Authorization": "Bearer " + token
}
});
this.isAdmin = user['data'].isAdmin;
},

async mounted() {
this.publications = await this.getAllPosts();
},

methods: {
async getAllPosts() {

try {
const token = localStorage.getItem("token");
const getPosts = await this.axios.get(`${API_URL}/post/`, {
headers: {
Authorization: "Bearer " + token
}
});

const datas = getPosts['data'].posts;

if (datas.length > 0) {
return datas.reverse();
}

return [];
} catch (e) {
console.log(e);
}
}
}
});
function __VLS_template() {
// @ts-ignore
[isAdmin];
return {};
}
