import { connect } from "react-redux";
import { navigateToDashboard } from "store/actionCreators";
import Welcome from "./Welcome";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  navigateToDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
