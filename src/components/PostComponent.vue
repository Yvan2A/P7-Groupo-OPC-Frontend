<template>
    <div class="conteneur">
        <div class="post">
            <div class="edit">
                <button type="button" aria-label="Modifier mon post" v-if="isAdmin || isMyPublication"
                    class="modif button" @click="modifyPost()"><i class="fas fa-edit" aria-hidden="true"></i></button>
                <button type="button" aria-label="Supprimer mon post" v-if="isAdmin || isMyPublication"
                    @click="deletePost(publication._id)" class="supp button"><i class="fa fa-trash"
                        aria-hidden="true"></i></button>
            </div>
            <ProfilPostComponent :user="publication.user[0]" />
            <span>posté {{ moment(publication.date).locale("fr").fromNow() }}</span>

            <p class="postText">{{ publication.postText }}</p>

            <img v-if="publication.imageUrl != ''" :src="publication.imageUrl" alt="Image du post" />
            <LikeComponent :likeCount="publication.likes" :isLiked="isLiked" :postId="publication._id" />
        </div>
    </div>
</template>

<script>
let moment = require("moment");

import { API_URL } from "./../../common/utils"
import ProfilPostComponent from './ProfilPostComponent.vue'
import LikeComponent from "./LikeComponent.vue"

export default {
    name: 'PostComponent',
    components: {
        ProfilPostComponent,
        LikeComponent,
    },

     data() {
    return {
      moment: moment,
    };
    },

    props: ['publication', 'isAdmin'],
    
    computed: {
        isLiked() {
            return this.publication.usersLiked.includes(this.getConnectedUserId)
        },

        isMyPublication() {
            return this.getAuthorId == this.getConnectedUserId
        },
        getAuthor() {
            return this.publication.user[0]
        },
        getName() {
            const user = this.publication.user[0]

            return user.lastname + ' ' + user.firstname
        },
        getAuthorId() {
            return this.getAuthor._id
        },
        getConnectedUserId() {
            return localStorage.getItem('userId')
        },
    },
    methods: {
        modifyPost() {
            this.$router.push({ name: 'modifyPost', params: { idPost: this.publication._id } })
        },
        deletePost() {
            const token = localStorage.getItem("token")
            const id = this.publication._id
            this.axios.delete(`${API_URL}/post/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(() => alert.success('Post supprimé !'))
                .catch((error) => console.log(error.response));
            this.$router.go()
        },
        async getTextImg() {
            try {
                let formData = new FormData();
                const id = localStorage.getItem("userId")
                const token = localStorage.getItem("token")
                const recuperation = await this.axios.get(`${API_URL}/post/${id}`, formData, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                await recuperation.json()
                formData.append('image', this.image);
                formData.append('postText', this.text)

            } catch (e) {
                console.log(e)
            }
        },
    }
}
</script>

<style lang="scss" scoped>
div.conteneur {
    display: flex;
    justify-content: center;

    div.post {
        width: 70%;
        border: 1px solid #ebecf0;
        border-radius: 10px;
        margin-bottom: 15px;
        margin-top: 15px;
        background-color: #ffd7d7;

        .postText {
            padding-left: 15px;
            padding-top: 25px;
            display: flex;
            font-size: 20px;
        }

        img {
            width: 60%;
            margin-bottom: 50px;
            margin-top: 25px;
        }

        .button {
            border: 0.5px solid;
            border-radius: 10px;
            border-color: #bcbdc4;
            background-color: white;
            color: #fd2d01;
            padding: 5px;
            margin: 5px;
            size: 10px;
        }

        :hover.button {
            background-color: #4e5166;
            color: white;
        }
    }

    .edit {
        display: flex;
        justify-content: end;
    }
}
</style>
