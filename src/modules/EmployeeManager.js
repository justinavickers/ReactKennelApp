import settings from "./settings"

export default {
  get(id) {
    return fetch(`${settings.remoteURL}/employees/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${settings.remoteURL}/employees`).then(e => e.json())
  }
}