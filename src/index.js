import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

// COMPONENTS
import { Layout } from "antd";
import { Root } from "app/views";

// CSS
import "antd/dist/antd.css";

const RootComponent = (
	<AppContainer>
		<Layout style={{ minHeight: "100vh",  backgroundImage: "linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)" }}>
			<Root />
		</Layout>
	</AppContainer>
);

(() => {
	ReactDOM.render(
		RootComponent,
		document.getElementById("root")
	);
})();
