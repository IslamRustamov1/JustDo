import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpClientModule } from "@angular/common/http";
import { setContext } from "apollo-link-context";

import { TokenService } from "./services/token-service/token.service";
import { ApolloLink } from "apollo-link";

export function createApollo(httpLink: HttpLink) {
  const uri = "http://localhost:3000";

  const tokenService = new TokenService();

  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  }));

  const link = ApolloLink.from([auth, httpLink.create({ uri })]);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
