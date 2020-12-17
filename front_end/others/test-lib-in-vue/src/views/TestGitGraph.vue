<template>
  <div class="">
    <h1>gitgraph.js test page</h1>
    <el-row :gutter="10">
      <el-col :span="8">
        <!-- 分支列表 -->
        <el-card style="width: 400px; margin: 0 auto;" header="分支列表">
          <el-table
            :data="branchNames"
            border
            stripe
            style="width: 200px; margin: 0 auto"
          >
            <el-table-column prop="name" label="分支"></el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-input
              size="medium"
              clearable
              style="width: 200px; margin-right: 20px"
              v-model="branch"
            ></el-input>
            <el-button @click="createBranch" type="primary" size="medium"
              >新建分支</el-button
            >
          </div>
        </el-card>
        <!-- 提交信息位置 -->
        <el-card
          style="width: 400px; margin: 0 auto; margin-top: 20px"
          header="提交信息表單"
        >
          <el-form :model="form" label-width="80px">
            <el-form-item label="分支">
              <el-select v-model="form.branch">
                <el-option
                  v-for="b in branchNames"
                  :key="b.name"
                  :value="b.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="提交信息">
              <el-input
                v-model="form.commitMessage"
                type="textarea"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="gitCommit">Commit!</el-button>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="16">
        <!-- git graph 位置 -->
        <div id="git-graph"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  createGitgraph,
  templateExtend,
  TemplateName,
  Mode
} from '@gitgraph/js'

export default {
  name: 'TestGitGraph',
  data() {
    return {
      gitGraph: null,
      branches: {},
      form: {
        branch: '',
        commitMessage: ''
      },
      branch: ''
    }
  },
  computed: {
    branchNames() {
      const names = Object.keys(this.branches)
      const branches = []
      for (let name of names) {
        branches.push({ name })
      }
      return branches
    }
  },
  mounted() {
    // const _graphContainer = document.getElementById('git-graph')
    // const _gitGraph = createGitgraph(graphContainer, {
    // orientation: 'vertical-reverse'
    // orientation: 'horizontal'
    // orientation: 'horizontal-reverse'

    // template: 'metro'
    // template: 'blackarrow'
    // template: templateExtend('metro', {
    //   colors: ['orange', 'blue', 'red', 'orange']
    // })

    // mode: 'compact'

    // })
    const graphContainer = document.getElementById('git-graph')
    const gitgraph = createGitgraph(graphContainer, {
      /* options */
      mode: Mode.Compact,
      template: templateExtend(TemplateName.Metro, {
        commit: {
          message: {
            displayAuthor: false
          }
        }
      })
    })
    // const createText = function(options) {
    //   const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
    //   const text = document.createElementNS(SVG_NAMESPACE, 'text')
    //   text.setAttribute("alignment-baseline", "central");
    //   text.setAttribute("dominant-baseline", "central");
    //   text.textContent = options.content
    //   text.setAttribute("fill", options.fill)
    //   text.setAttribute("x", options.translate.x.toString())
    //   text.setAttribute("y", options.translate.y.toString())
    //   text.setAttribute("style", `font: ${options.font}`)
    //   return text
    // }
    // const renderMessage = function(commit) {
    //   return createText({
    //     font: { fontize: 20 },
    //     translate: { x: 0, y: commit.style.dot.size },
    //     fill: commit.style.dot.color,
    //     content: commit.hash
    //   })
    //   // return document.createTextNode(data)
    // }
    const onClick = function(commit) {
      console.log('click')
      console.log(commit)
    }
    const onMouseOver = function(commit) {
      console.log('mouse over')
      console.log(commit)
    }
    const master = gitgraph.branch('master').commit('init repository')
    const feat1 = gitgraph
      .branch('feat1')
      .commit({ subject: 'feat1 commit 1', onClick })
      .commit({ subject: 'feat1 commit 2', onMouseOver })
    master.merge(feat1, 'merge feat 1 fast forward')

    this.gitGraph = gitgraph
    // this.init(gitGraph)
  },
  methods: {
    init(gitGraph) {
      // const master = gitGraph
      // this.setBranch('master', master)
      // master.commit('init')
      // this.setBranch('develop')
      // this.setCommit('develop', 'create develop base on master')
      // this.setBranch('release')
      // this.setCommit('release', 'release version v1.0.0')
      // this.setCommit('master', 'hotfix1')
      // this.setCommit('develop', 'fix in develop')
      // this.setMerge('release', 'develop', 'merge develop')
      // this.setMerge('master', 'release', 'complete develop of v1.0.0')
      // this.branches['master'].tag('v1.0.0')
    },
    setBranch(name) {
      const newBranch = this.gitGraph.branch(name)
      this.$set(this.branches, name, newBranch)
      return newBranch
    },
    setCommit(branchName, message) {
      const branch = this.branches[branchName]
      branch.commit(message)
    },
    setMerge(baseBranch, targetBranch, message) {
      const base = this.branches[baseBranch]
      const target = this.branches[targetBranch]
      base.merge(target, message)
    },
    createBranch() {
      console.log(`create branch ${this.branch}`)
      if (this.branch in this.branches) {
        console.log(`branch '${this.branch}' already exist`)
        return
      }
      if (this.branch.length <= 0) {
        console.log("branch name can't be empty")
        return
      }
      if (this.branch.length >= 10) {
        console.log('branch name should shorter than 10 characters')
        return
      }
      this.setBranch(this.branch)
      console.log(this.branches[this.branch])
      this.branch = ''
    },
    gitCommit(e) {
      e.preventDefault()
      console.log('commit')
      const { branch: name, commitMessage: msg } = this.form
      console.log(`branch: ${name}, message: ${msg}`)
      this.setCommit(name, msg)
    }
  }
}
</script>

<style></style>
