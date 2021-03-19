import { disableFragmentWarnings, enableExperimentalFragmentVariables } from '@apollo/client'

export default function useDisableFragments() {
  disableFragmentWarnings()
  enableExperimentalFragmentVariables()
}
