/**
 * @generated SignedSource<<5f01914378ba65d000dee078e304a33f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateVideo = {
  eventId: string;
  lang?: string | null;
  url?: string | null;
  videoId: string;
};
export type UpdateVideoMutation$variables = {
  input: UpdateVideo;
};
export type UpdateVideoMutationVariables = UpdateVideoMutation$variables;
export type UpdateVideoMutation$data = {
  readonly updateVideo: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly id: string;
      readonly url: string;
      readonly lang: string;
    } | null;
  };
};
export type UpdateVideoMutationResponse = UpdateVideoMutation$data;
export type UpdateVideoMutation = {
  variables: UpdateVideoMutationVariables;
  response: UpdateVideoMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EventVideoMutationResponse",
    "kind": "LinkedField",
    "name": "updateVideo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isError",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EventVideo",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lang",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateVideoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateVideoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d3ae8739e65f5fc63bbbea9db3bf6c91",
    "id": null,
    "metadata": {},
    "name": "UpdateVideoMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateVideoMutation(\n  $input: UpdateVideo!\n) {\n  updateVideo(input: $input) {\n    isError\n    message\n    body {\n      id\n      url\n      lang\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "36c7d2450a3ef9f36a53e79a4b31e0fb";

export default node;
