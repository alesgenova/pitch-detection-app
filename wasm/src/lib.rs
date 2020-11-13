mod utils;

use wasm_bindgen::prelude::*;

use pitch_detection::detector::PitchDetector;
use pitch_detection::detector::autocorrelation::{AutocorrelationDetector as AutocorrelationDetectorInternal};
use pitch_detection::detector::mcleod::{McLeodDetector as McLeodDetectorInternal};
use pitch_detection::detector::internals::Pitch;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct AutocorrelationDetector {
    wrapped: AutocorrelationDetectorInternal<f32>
}

#[wasm_bindgen]
impl AutocorrelationDetector {
    pub fn new(size: usize, padding: usize) -> Self {
        let wrapped = AutocorrelationDetectorInternal::<f32>::new(size, padding);
        AutocorrelationDetector{
            wrapped
        }
    }

    pub fn get_pitch(&mut self, signal: &[f32], sample_rate: usize, power_threshold: f32, clarity_threshold: f32, pitch: &mut [f32])  {
        let result = self.wrapped.get_pitch(signal, sample_rate, power_threshold, clarity_threshold);
        pitch_option_to_output(result, pitch);
    }
}

#[wasm_bindgen]
pub struct McLeodDetector {
    wrapped: McLeodDetectorInternal<f32>
}

#[wasm_bindgen]
impl McLeodDetector {
    pub fn new(size: usize, padding: usize) -> Self {
        let wrapped = McLeodDetectorInternal::<f32>::new(size, padding);
        McLeodDetector{
            wrapped
        }
    }

    pub fn get_pitch(&mut self, signal: &[f32], sample_rate: usize, power_threshold: f32, clarity_threshold: f32, pitch: &mut [f32])  {
        let result = self.wrapped.get_pitch(signal, sample_rate, power_threshold, clarity_threshold);
        pitch_option_to_output(result, pitch);
    }
}

fn pitch_option_to_output(option: Option<Pitch<f32>>, output: &mut [f32]) {
    match option {
        Some(pitch) => {
            output[0] = pitch.frequency;
            output[1] = pitch.clarity;
        },
        None => {
            output[0] = -1.0;
            output[1] = 0.0;
        }
    }
}
