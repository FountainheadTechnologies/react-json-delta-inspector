declare module 'react-inspector' {
  export const ObjectLabel: React.SFC<{
    name?: string;
    data: any;
    isNonenumerable: boolean;
  }>;

  export const ObjectName: React.SFC<{
    name: string;
  }>;

  export const ObjectValue: React.SFC<{
    object: any;
  }>;
}

declare module 'react-inspector/lib/styles/ThemeProvider' {
  const ThemeProvider: React.SFC<{
    theme: string;
  }>;

  export default ThemeProvider;
}

declare module 'react-inspector/lib/tree-view/TreeView' {
  const TreeView: React.SFC<{
    nodeRenderer: React.ComponentType<{
      depth: number;
      name?: string;
      data: {};
    }>;
    dataIterator: any;
    data: any;
    expandPaths?: string[];
  }>;

  export default TreeView;
}
