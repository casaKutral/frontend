<script>
import Layout from '@layouts/main.vue'
import FieldInput from '@/src/components/inputSearch.vue'
import Table from '@/src/components/tabla.vue'

export default {
  page() {
    return {
      title: this.user.name,
      meta: [
        {
          name: 'description',
          content: `The user profile for ${this.user.name}.`,
        },
      ],
    }
  },
  components: { Layout, FieldInput, Table },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  name: 'RegularCheckboxes',
  data: () => ({
    array: [],
    boolean: false,
    string: null,
    novalue: null,
    disabled: true,
    obj1: { name: 'obj1' },
    obj2: { name: 'obj2' },
    obj: null,
    indeterminate: true,
  }),
}
</script>

<template>
  <Layout>
    <div class="container">
      <div class="data">
        <div class="">
          <div class="row containerTabs">
            <button class="btnTab title" :class="active"
              >Buscar por código</button
            >
            <button class="btnTab title disabled">Buscar por correo</button>
          </div>
          <div class="row containerBtns">
            <FieldInput class="campo" />
            <button class="primary">
              Validar RESERVA
            </button>
            <button class="miniBtn disabled-button">
              <svg
                width="40"
                height="47"
                viewBox="0 0 40 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.85714 42.5938C2.85714 43.7624 3.30867 44.8831 4.1124 45.7095C4.91613 46.5358 6.00622 47 7.14286 47H32.8571C33.9938 47 35.0839 46.5358 35.8876 45.7095C36.6913 44.8831 37.1429 43.7624 37.1429 42.5938V11.75H2.85714V42.5938ZM27.1429 19.0938C27.1429 18.7042 27.2934 18.3306 27.5613 18.0552C27.8292 17.7798 28.1925 17.625 28.5714 17.625C28.9503 17.625 29.3137 17.7798 29.5816 18.0552C29.8495 18.3306 30 18.7042 30 19.0938V39.6563C30 40.0458 29.8495 40.4194 29.5816 40.6948C29.3137 40.9703 28.9503 41.125 28.5714 41.125C28.1925 41.125 27.8292 40.9703 27.5613 40.6948C27.2934 40.4194 27.1429 40.0458 27.1429 39.6563V19.0938ZM18.5714 19.0938C18.5714 18.7042 18.7219 18.3306 18.9898 18.0552C19.2578 17.7798 19.6211 17.625 20 17.625C20.3789 17.625 20.7422 17.7798 21.0102 18.0552C21.2781 18.3306 21.4286 18.7042 21.4286 19.0938V39.6563C21.4286 40.0458 21.2781 40.4194 21.0102 40.6948C20.7422 40.9703 20.3789 41.125 20 41.125C19.6211 41.125 19.2578 40.9703 18.9898 40.6948C18.7219 40.4194 18.5714 40.0458 18.5714 39.6563V19.0938ZM10 19.0938C10 18.7042 10.1505 18.3306 10.4184 18.0552C10.6863 17.7798 11.0497 17.625 11.4286 17.625C11.8075 17.625 12.1708 17.7798 12.4387 18.0552C12.7066 18.3306 12.8571 18.7042 12.8571 19.0938V39.6563C12.8571 40.0458 12.7066 40.4194 12.4387 40.6948C12.1708 40.9703 11.8075 41.125 11.4286 41.125C11.0497 41.125 10.6863 40.9703 10.4184 40.6948C10.1505 40.4194 10 40.0458 10 39.6563V19.0938ZM38.5714 2.93752H27.8571L27.0179 1.22091C26.8401 0.853924 26.5662 0.545219 26.2271 0.329529C25.8879 0.113839 25.497 -0.000277958 25.0982 1.60945e-05H14.8929C14.495 -0.00155644 14.1047 0.112135 13.7668 0.328065C13.4289 0.543994 13.1569 0.853428 12.9821 1.22091L12.1429 2.93752H1.42857C1.04969 2.93752 0.686328 3.09226 0.418419 3.3677C0.15051 3.64315 0 4.01673 0 4.40627L0 7.34377C0 7.7333 0.15051 8.10688 0.418419 8.38233C0.686328 8.65777 1.04969 8.81252 1.42857 8.81252H38.5714C38.9503 8.81252 39.3137 8.65777 39.5816 8.38233C39.8495 8.10688 40 7.7333 40 7.34377V4.40627C40 4.01673 39.8495 3.64315 39.5816 3.3677C39.3137 3.09226 38.9503 2.93752 38.5714 2.93752Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss">
@import '@design';

.container {
  width: 100vw;
  margin: auto;
  display: flex;
  justify-content: center;
  .data {
    background-color: #f2f5f9;
    padding: 3%;
    width: 80%;
    margin: 3%;
    .campo {
      width: 50%;
    }
    .miniBtn {
      svg {
        height: 30px;
      }
    }
    .containerTabs {
      width: 50%;
      justify-content: space-between;
      margin-left: 8.1%;
      .btnTab {
        padding: 1px 1px 5px 1px;
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }
  }
}

.primary {
  @include main-button;
  width: fit-content;
  background-color: $verde-original;
}
.bloqueInfo {
  @include bloqueInfo;
}
.disabled-button {
  @include disabled-button;
  width: fit-content;
}
.row {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  &.containerBtns {
    justify-content: space-evenly;
  }
}
.title {
  @include title;
  color: $azul-original;
  font-size: 20px;
}
button, svg {
  cursor: pointer;
  &.primary {
    @include main-button;
    background-color: $verde-original;
    width: fit-content;
    padding: 14px;
  }
}
.disabled{
  color: #CCCCCC;
}
</style>
