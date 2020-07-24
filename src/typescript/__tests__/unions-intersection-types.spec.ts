/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
import { whatever } from '../../utils/whatever';

function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

function betterPadLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

test('pad left', () => {
  expect(padLeft('Hello world', 4)).toEqual('    Hello world');
  expect(betterPadLeft('Hello world', 4)).toEqual('    Hello world');
  try {
    padLeft('Hello world', true);
  } catch (e) {
    expect(e.toString()).toEqual("Error: Expected string or number, got 'true'.");
  }
});

interface Bird {
  fly(): void;

  layEggs(): void;
}

interface Fish {
  swim(): void;

  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  return {
    fly(): void {
      whatever(1);
    },
    layEggs(): void {
      whatever(1);
    },
  };
}

test('Only available in one of the two possible types', () => {
  const pet = getSmallPet();
  pet.layEggs();
  // pet.swim(); invalid!
});

type NetworkLoadingState = {
  state: 'loading';
};

type NetworkFailedState = {
  state: 'failed';
  code: number;
};

type NetworkSuccessState = {
  state: 'success';
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState;

function networkStatus(state: NetworkState): string {
  // Right now TypeScript does not know which of the three
  // potential types state could be.

  // Trying to access a property which isn't shared
  // across all types will raise an error (exp. state.code)

  // By switching on state, TypeScript can narrow the union
  // down in code flow analysis
  switch (state.state) {
    case 'loading':
      return 'Downloading...';
    case 'failed':
      // The type must be NetworkFailedState here,
      // so accessing the `code` field is safe
      return `Error ${state.code} downloading`;
    case 'success':
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}

test('discriminating unions', () => {
  const loading: NetworkLoadingState = {
    state: 'loading',
  };
  const failed: NetworkFailedState = {
    state: 'failed',
    code: 400,
  };
  const success: NetworkSuccessState = {
    state: 'success',
    response: {
      title: 'title',
      duration: 1200,
      summary: 'summary',
    },
  };
  expect(networkStatus(loading)).toEqual('Downloading...');
  expect(networkStatus(failed)).toEqual('Error 400 downloading');
  expect(networkStatus(success)).toEqual('Downloaded title - summary');
});

interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.
type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

test('intersection types', () => {
  function getArtWorks(): ArtworksResponse {
    return {
      artworks: [],
      error: { message: 'art works' },
      success: false,
    };
  }

  function getArtists(): ArtistsResponse {
    return {
      artists: [],
      error: { message: 'artists' },
      success: false,
    };
  }

  expect(getArtists()).not.toBeNull();
  expect(getArtWorks()).not.toBeNull();
});
