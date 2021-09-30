import Header from "./Header";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  entry: state.entry,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
